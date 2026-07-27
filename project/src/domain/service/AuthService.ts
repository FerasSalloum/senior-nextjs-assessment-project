import { email, z } from "zod";
import { IUserRepository } from "../repositories/IUserRepository";
import { LoginSchema, RegisterSchema } from "@/src/validators/schemas";
import { Users } from "@prisma/client";
import bcrypt from "bcryptjs";
type registerType = z.infer<typeof RegisterSchema>;
export class AuthService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async register(date: registerType): Promise<Users> {
    const validateData = RegisterSchema.parse(date);
    const existingUser = await this.userRepository.findByEmail(date.email);
    if (!existingUser) {
      throw new Error("Invalid input values");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validateData.passowrd, salt);
    return await this.userRepository.create({
      name: validateData.name,
      email: validateData.email,
      password: hashedPassword,
    });
  }
  async Login(date: registerType): Promise<Users> {
    const validateData = LoginSchema.parse(date);
    const existingUser = await this.userRepository.findByEmail(date.email);
    if (!existingUser) {
      throw new Error("Invalid input values");
    }
    const validatePassword = await bcrypt.compare(
      validateData.passowrd,
      existingUser.password,
    );
    if (!validatePassword) {
      throw new Error("Invalid input values");
    }
    return existingUser;
  }
}
