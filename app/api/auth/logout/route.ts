import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("name");
    cookieStore.delete("email");
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
