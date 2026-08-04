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

  async register(data: registerInput): Promise<Users> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    // const token = this.generateToken(user.id);
    // return { user, token };
    return user;
  }

  async Login(data: loginInput): Promise<Users> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid input values");
    }
    const validatePassword = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (!validatePassword) {
      throw new Error("Invalid input values");
    }
    // const token = this.generateToken(existingUser.id);
    // return { user: existingUser, token };
    return user;
  }

  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET || "fallback_super_secret_key";
    return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
  }
}
