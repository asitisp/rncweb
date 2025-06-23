import {
    Email,
    Item,
    Span,
    A,
    Body,
    Html,
    Head,
    Hr,
    P,
    Text,
    Section,
    Img,
  } from "@react-email/components";
  
export interface VerificationEmailProps {
    verificationLink: string;
    otp: string;
}

export const VerificationEmail = ({ verificationLink, otp }: VerificationEmailProps) => {
    return (
      <Html>
        <Head />
        <Body style={{ margin: 0, padding: 0, fontFamily: "Arial, sans-serif" }}>
          <Section style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
            <Item>
              <Img
                src="https://example.com/logo.png"
                alt="Logo"
                width="100"
                height="100"
              />
            </Item>
            <Hr />
            <P style={{ fontSize: "16px", color: "#333" }}>
              Hello,
            </P>
            <P style={{ fontSize: "16px", color: "#333" }}>
              Please verify your email address by clicking the link below:
            </P>
            <A href={verificationLink} style={{ color: "#1a73e8", textDecoration: "none" }}>
              Verify Email
            </A>
            <P style={{ fontSize: "16px", color: "#333" }}>
              Or use the OTP code below:
            </P>
            <Span style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
              {otp}
            </Span>
          </Section>
        </Body>
      </Html>
    );
  };

