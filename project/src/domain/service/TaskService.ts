import { z } from "zod";
import { ITaskRepositry } from "../repositories/ITaskRepository copy";
import { TasckSchema } from "@/src/validators/schemas";
import { Task } from "@prisma/client";
type TaskInput = z.infer<typeof TasckSchema>;
export class TaskService {
  private taskRepositry: ITaskRepositry;
  constructor(taskRepositry: ITaskRepositry) {
    this.taskRepositry = taskRepositry;
  }
  async createTask(data: TaskInput): Promise<Task> {
    const valdateData = TasckSchema.parse(data);
    return await this.taskRepositry.create(valdateData);
  }
  async updateTAskeStatus(
    id: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE",
  ): Promise<Task | null> {
    const existingTask = await this.taskRepositry.findById(id);
    if (!existingTask) {
      throw new Error("Taske not fond");
    }
    return await this.taskRepositry.update(id, { status: newStatus });
  }
  async gitProjectTaske(projectId: string): Promise<Task[]> {
    return await this.taskRepositry.findByProjectId(projectId);
  }
}
