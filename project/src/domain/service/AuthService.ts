import { z } from "zod";
import { IUserRepository } from "../repositories/IUserRepository";
import { LoginSchema, RegisterSchema } from "@/src/validators/schemas";
import { Users } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type registerInput = z.infer<typeof RegisterSchema>;
type loginInput = z.infer<typeof LoginSchema>;

export class AuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(data: registerInput): Promise<{ user: Users; token: string }> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.passowrd, salt);
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    const token = this.generateToken(user.id);
    return { user, token };
  }

  async Login(data: loginInput): Promise<{ user: Users; token: string }> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (!existingUser) {
      throw new Error("Invalid input values");
    }
    const validatePassword = await bcrypt.compare(
      data.passowrd,
      existingUser.password,
    );
    if (!validatePassword) {
      throw new Error("Invalid input values");
    }
    const token = this.generateToken(existingUser.id);

    return { user: existingUser, token };
  }

  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET || "fallback_super_secret_key";
    return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
  }
}
