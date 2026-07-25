import z from "zod";
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least two characters")
    .max(20, "The name must be less than 20 characters"),
  email: z.email("Invalid email format."),
  passowrd: z.string().min(6, "The password must be at least 6 characters"),
});
export const LoginSchema = z.object({
  email: z.email("Invalid email format."),
  passowrd: z.string().min(6, "The password must be at least 6 characters"),
});
export const ProjectSchema = z.object({
  title: z.string().min(3, "The title must be at least 3 characters"),
  description: z.string().optional(),
  onwerId: z.string().min(1, "Owner ID is required"),
});
