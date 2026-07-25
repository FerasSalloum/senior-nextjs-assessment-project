import { Task, TaskPrority, TaskStatus } from "@prisma/client";

export interface ITaskRepositry {
  create(data: {
    title: string;
    description?: string;
    status: TaskStatus;
    priroity: TaskPrority;
    dueDate: Date;
    projectId: string;
    assigneeId?: string;
  }): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  update(id: string, data: Partial<Task>): Promise<Task | null>;
  delete(id: string): Promise<void>;
}
