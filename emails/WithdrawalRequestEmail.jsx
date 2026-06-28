import { Container, Text } from "lucide-react";
import { Html } from ;



export function WithdrawalRequestEmail({
  interviewerName,
  interviewerEmail,
  credits,
  platformFee,
  netAmount,
  paymentMethod,
  paymentDetail,
  reviewUrl,
}) {
    return(
        <Html>
            <Body
                style={{
                    fontFamily: "Georgia , serif",
                    padding: "32px 16px",
                }}
                >
                    <Container
                        style={{
                            maxWidth: "480px",
                            margin: "0 auto",
                        }}
                        >
                            <Text
                                style={{ fontSize: "22px", color: "#111827", margin: "0 0 4px" }}
                                >
                                    MockMate 
                                </Text>
                        </Container>
                </Body>


        </Html>
    )
}