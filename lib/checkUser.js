import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const PLAN_CREDITS = {
  pro: 15,
  starter: 5,
  free: 1,
};

const getCurrentPlan = async () => {
  const { has } = await auth();
  if (has({ plan: "pro" })) return "pro";
  if (has({ plan: "starter" })) return "starter";
  return "free";
};

const shouldAllocateCredits = (dbUser, currentPlan) => {
  if (dbUser.currentPlan !== currentPlan) return true;

  if (!dbUser.creditsLastAllocatedAt) return true;

  const now = new Date();
  const last = new Date(dbUser.creditsLastAllocatedAt);

  return (
    now.getFullYear() > last.getFullYear() ||
    now.getMonth() > last.getMonth()
  );
};

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const currentPlan = await getCurrentPlan();
    const credits = PLAN_CREDITS[currentPlan];

    // Safe name (never "null null")
    const name =
      [user.firstName, user.lastName]
        .filter(Boolean)
        .join(" ")
        .trim() ||
      user.username ||
      user.emailAddresses[0]?.emailAddress ||
      "User";

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      // Update invalid/missing profile data
      if (
        !loggedInUser.name ||
        loggedInUser.name === "null null" ||
        loggedInUser.imageUrl !== user.imageUrl
      ) {
        await db.user.update({
          where: {
            clerkUserId: user.id,
          },
          data: {
            name,
            imageUrl: user.imageUrl,
          },
        });

        loggedInUser.name = name;
        loggedInUser.imageUrl = user.imageUrl;
      }

      // Interviewers don't use subscription credits
      if (loggedInUser.role === "INTERVIEWER") {
        return loggedInUser;
      }

      if (shouldAllocateCredits(loggedInUser, currentPlan)) {
        const rolledCredits =
          credits + (loggedInUser.credits ?? 0);

        return await db.user.update({
          where: {
            clerkUserId: user.id,
          },
          data: {
            credits: rolledCredits,
            currentPlan,
            creditsLastAllocatedAt: new Date(),
          },
        });
      }

      return loggedInUser;
    }

    // Create new user
    return await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress,
        credits,
        currentPlan,
        creditsLastAllocatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("checkUser error:", error);
    return null;
  }
};