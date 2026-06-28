"use server";

export const approvePayout = async ({ payoutId, adminPassword }) => {
    if(!adminPassword) throw new Error("Password required");
    if(adminPassword !== process.env.ADMIN_PAYOUT_PASSWORD)u{
        throw new Error("Incorrect Password");
    }
    
}