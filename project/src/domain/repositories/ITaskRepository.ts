import { Task, TaskPriority, TaskStatus } from "@prisma/client";

export type CreateTaskInput = {
  title: string;
  description?: string;
  status: TaskStatus;
  priroity: TaskPriority;
  dueDate?: Date;
  projectId: string;
  assigneeId?: string;
};

export interface ITaskRepository {
  create(data: CreateTaskInput): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  update(id: string, data: Partial<Task>): Promise<Task | null>;
  delete(id: string): Promise<void>;
}
