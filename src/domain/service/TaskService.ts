import { z } from "zod";
import { CreateTaskInput, ITaskRepository } from "../repositories/ITaskRepository";
import { TaskSchema } from "@/src/validators/schemas";
import { Task } from "@prisma/client";
type TaskInput = z.infer<typeof TaskSchema>;
export class TaskService {
  private taskRepository: ITaskRepository;
  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }
  async createTask(data: TaskInput): Promise<Task> {
    return await this.taskRepository.create(data as CreateTaskInput);
  }
  async updateTaskStatus(
    id: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE",
  ): Promise<Task | null> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new Error("Task not found");
    }
    return await this.taskRepository.update(id, { status: newStatus });
  }
  async gitProjectTaske(projectId: string): Promise<Task[]> {
    return await this.taskRepository.findByProjectId(projectId);
  }
}
