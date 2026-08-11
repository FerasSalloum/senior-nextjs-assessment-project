import { auth } from "@/auth";
import { ProjectService } from "@/src/domain/service/ProjectService";
import { PrismaProjectRepository } from "@/src/infrastructure/repositories/PrismaProjectRepository";
import { ProjectSchema } from "@/src/validators/schemas";
import { NextRequest, NextResponse } from "next/server";

const projrectRepositry = new PrismaProjectRepository();
const projectService = new ProjectService(projrectRepositry);

export const GET = async (request: NextRequest) => {
  try {
    const session = await auth()
    const userId =session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    const projects = await projectService.getUserProject(userId);
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("GET Progects Error");
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const session = await auth()
    const userId =session?.user?.id
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    const body = await request.json();
    const projectData = {
      ...body,
      ownerId: userId,
    };
    const validatedData = ProjectSchema.parse(projectData);
    const newProject = await projectService.createProject(validatedData);

    return NextResponse.json(
      { message: "Project created successfully", newProject },
      { status: 201 },
    );
  } catch (error) {
    console.error( error);
    return NextResponse.json(
      { error: "Error creating project" },
      { status: 500 },
    );
  }
};
