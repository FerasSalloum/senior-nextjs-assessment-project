import { Project } from "@prisma/client";
import { IProjectRepository } from "../repositories/IProjectRepository";
import { ProjectSchema, UpdateProjectSchema } from "@/src/validators/schemas";
import { z } from "zod";
type projectInput = z.infer<typeof ProjectSchema>;
type projectUpdateInput = z.infer<typeof UpdateProjectSchema>;

export class ProjectService {
  private projectRepository: IProjectRepository;
  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async createProject(data: projectInput): Promise<Project> {
    return await this.projectRepository.create(data);
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
  async updateProject(id: string, data: projectUpdateInput): Promise<Project> {
    await this.getProjectById(id);
    const updateProject = await this.projectRepository.update(id, data);
    if (!updateProject) {
      throw new Error("project not found");
    }
    return updateProject;
  }
  async deleteProject(id: string): Promise<void> {
    await this.getProjectById(id);
    await this.projectRepository.delete(id);
  }
}
