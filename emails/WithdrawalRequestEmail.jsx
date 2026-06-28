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
                                <Text
                                    style={{
                                        fontSize: "11px",
                                        color: "#6b7280",
                                        letterSpacing: "0.1em",
                                        textTransform: "0 0 32px",
                                    }}
                                    >
                                        Withdrawal Request
                                    </Text>

                                    <Text
                                        style={{ fontSize: "14px", color: "#374151", margin: "0 0 4px"}}>
                                            
                                        </Text>
                        </Container>
                </Body>


        </Html>
    )
}