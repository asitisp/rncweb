import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    // Validate email and password
   const existingVerifiedUser =await UserModel.findOne({ username,
        isVerified: true })
    if(existingVerifiedUser){
        return new Response(JSON.stringify({ 
            success: false,
            error: "Username already exists." })
        , { status: 400 });

    }
     const existingUserByEmail = await UserModel.findOne({email});
    const verifyCode=Math.floor(Math.random() * 1000000).toString();
    
     if (existingUserByEmail) {
      return new Response(JSON.stringify({ 
        success: false,
        error: "Email already exists." 
      }), { status: 400 });
    }
    
     else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry to 1 hour from now
      const newuser = await new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMsg: true,
      messages: [],
    })
    await newuser.save();
    const VerificationResponse = await sendVerificationEmail(
      email,
      `http://localhost:3000/verify/${verifyCode}`,
      verifyCode
    );
    if (!VerificationResponse.success) {
      return new Response(JSON.stringify({ 
        success: false,
        error: "Failed to send verification email." 
      }), { status: 500 });
    }
    return new Response(JSON.stringify({ 
      success: true,
      message: "User created successfully. Please verify your email." 
    }), { status: 201 });

  } catch (error) {
    console.error("Error during user validation:", error);
    return new Response(JSON.stringify({ error: "An error occurred during user validation." }), { status: 500 });
  }
};

