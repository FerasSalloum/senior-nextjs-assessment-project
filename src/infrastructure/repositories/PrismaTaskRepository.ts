import {
  CreateTaskInput,
  ITaskRepository,
} from "@/src/domain/repositories/ITaskRepository";
import { prisma } from "@/src/lib/prisma";
import type { Task } from "@prisma/client";

export class PrismaTaskRepsitroy implements ITaskRepository {
  async create(data: CreateTaskInput): Promise<Task> {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priroity: data.priroity,
        dueDate: data.dueDate,
        projectId: data.projectId,
        assigneeId: data.assigneeId,
      },
    });
  }
  async findById(id: string): Promise<Task | null> {
    return await prisma.task.findUnique({ where: { id } });
  }
  async findByProjectId(projectId: string): Promise<Task[]> {
    return await prisma.task.findMany({ where: { projectId } });
  }
  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    return await prisma.task.update({ where: { id }, data });
  }
  async delete(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
