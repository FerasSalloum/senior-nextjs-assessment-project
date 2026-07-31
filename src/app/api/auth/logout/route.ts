import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return NextResponse.json(
      { message: "logout successfull" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
