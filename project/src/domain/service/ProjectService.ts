import { Project } from "@prisma/client";
import { IProjectRepository } from "../repositories/IProjectRepository";
import { ProjectSchema } from "@/src/validators/schemas";
import { z } from "zod";
type projectInput = z.infer<typeof ProjectSchema>;

export class ProjectService {
  private projectRepository: IProjectRepository;
  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async createProject(data: projectInput): Promise<Project> {
    const valdateData = ProjectSchema.parse(data);
    return await this.projectRepository.create(valdateData);
  }
  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }
  async getUserProject(userId: string): Promise<Project[]> {
    return await this.projectRepository.findByOwnerId(userId);
  }
  async deleteProject(id: string): Promise<void> {
    await this.getProjectById(id);
    await this.projectRepository.delete(id);
  }
}
