import { AuthService } from "@/src/domain/service/AuthService";
import { PrismaUserRepository } from "@/src/infrastructure/repositories/PrismaUserRepository";
import { encrypt } from "@/src/lib/crypto";
import { RegisterSchema } from "@/src/validators/schemas";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const userRepository = new PrismaUserRepository();
const authServers = new AuthService(userRepository);

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validateData = RegisterSchema.parse(body);
    const { user, token } = await authServers.register(validateData);
    const encryptedName = encrypt(user.name);
    const encryptedEmail = encrypt(user.email);
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set({
      name: "name",
      value: encryptedName,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set({
      name: "email",
      value: encryptedEmail,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json(
      { message: "Logged in successfull", user },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", detalis: error.message },
        { status: 400 },
      );
    }
    if (error instanceof Error && error.message == "Invalid input values") {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: "Email address is already in use, please sign",
            detalis: error.message,
          },
          { status: 409 },
        );
      }
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
