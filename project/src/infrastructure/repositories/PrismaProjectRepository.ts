import { IProjectRepository } from "@/src/domain/repositories/IProjectRepository";
import { prisma } from "@/src/lib/prisma";
import { Project } from "@prisma/client";
export class PrismaProjectRepository implements IProjectRepository {
  async create(data: {
    title: string;
    description?: string;
    ownerId: string;
  }): Promise<Project> {
    return await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        ownerId: data.ownerId,
      },
    });
  }
  async findById(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: { id },
    });
  }
  async findByOwnerId(ownerId: string): Promise<Project[]> {
    return await prisma.project.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
    });
  }
  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
    },
  ): Promise<Project | null> {
    return await prisma.project.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.project.delete({ where: { id } });
  }
}
