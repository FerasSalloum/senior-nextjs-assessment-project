import { Project } from "@prisma/client";
export interface IProjectRepository {
  create(data: {
    title: string;
    description?: string;
    ownerId: string;
  }): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  findByOwnerId(ownerId: string): Promise<Project[]>;
  update(
    id: string,
    data: {
      title?: string;
      description?: string;
    },
  ): Promise<Project | null>;
  delete(id: string): Promise<void>;
}
