import { resend } from @/lib/resend;
import { VerificationEmail } from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  verificationLink: string,
  otp: string
): Promise<ApiResponse<void>> {
  try {
    const emailContent = VerificationEmail({
      verificationLink,
      otp,
    });

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: "Verify your email address",
      react: VerificationEmail({
        verificationLink,
        otp,
        }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:",
         error);
    return {
      success: false,
      message: "Failed to send verification email",
      isAcceptingMsg: true,
      messages: [
        {
          id: "email_send_error",
          text: "There was an error sending the verification email.",
        },
      ],
    };
  }
}
