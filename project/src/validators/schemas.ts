import z from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least two characters")
    .max(20, "The name must be less than 20 characters"),
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "The password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "The password must be at least 6 characters"),
});

export const ProjectSchema = z.object({
  title: z.string().min(3, "The title must be at least 3 characters"),
  ownerId: z.string().min(1, "Owner ID is required"),
  description: z.string().optional(),
});
export const UpdateProjectSchema = z.object({
  title: z
    .string()
    .min(3, "The title must be at least 3 characters")
    .optional(),
  description: z.string().optional(),
});

export const TaskSchema = z.object({
  title: z.string().min(3, "The title must be at least three characters"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priroity: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.coerce.date().optional(),
  projectId: z.string().min(1, "Project ID is required"),
  assigneeId: z.string().optional(),
});
export const UpdateTaskSchema = z.object({
  title: z
    .string()
    .min(3, "The title must be at least 3 characters")
    .optional(),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  priroity: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().optional(),
});
