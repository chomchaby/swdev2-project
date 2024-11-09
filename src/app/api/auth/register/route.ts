import { NextRequest, NextResponse } from "next/server";
import userRegister from "@/libs/userRegister";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, tel, role, password } = body;

    // Register the user in your database
    const user = await userRegister(name, email, tel, role, password);

    if (user) {
      // Return a success response
      return NextResponse.json(
        { message: "Registration successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Registration failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
