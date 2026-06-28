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
                                            <strong>{interviewerName}</strong> ({interviewerEmail}) has requested a withdrawal.
                                    </Text>

                                    <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0"}}/>

                                    {[
                                        ["Credits", credits],
                                        ["Platform fee (20%)", `− $${platformFee.toFixed(2)}`],
                                        ["Net payout", `$${netAmount.toFixed(2)}`],
                                        ["Method", paymentMethod],
                                        ["Send to", paymentDetail],
                                    ].map(([k, v]) => (
                                        
                                    ))}
                        </Container>
                </Body>


        </Html>
    )
}