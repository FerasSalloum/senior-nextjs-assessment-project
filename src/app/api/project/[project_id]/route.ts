import { auth } from "@/auth";
import { ProjectService } from "@/src/domain/service/ProjectService";
import { PrismaProjectRepository } from "@/src/infrastructure/repositories/PrismaProjectRepository";
import { UpdateProjectSchema } from "@/src/validators/schemas";
import { NextRequest, NextResponse } from "next/server";

const projrectRepositry = new PrismaProjectRepository();
const projectService = new ProjectService(projrectRepositry);

type params = Promise<{ project_id: string }>;

export const GET = async (
  request: NextRequest,
  { params }: { params: params },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    const { project_id } = await params;
    const project = await projectService.getProjectById(project_id);
    if (project.ownerId != userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 },
      );
    }
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error( error);
    if (error instanceof Error && error.message == "Project not found") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: params },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const { project_id } = await params;
    const project = await projectService.getProjectById(project_id);
    if (project.ownerId != userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 },
      );
    }
    const existingProject = await projectService.getProjectById(project_id);
    if (!existingProject) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    let body = await request.json();
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return NextResponse.json(
          { error: "البيانات المرسلة ليست بصيغة JSON صحيحة" },
          { status: 400 },
        );
      }
    }
    const validated = UpdateProjectSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: "بيانات التعديل غير صالحة",
          details: validated.error.format(),
        },
        { status: 400 },
      );
    }
    const updatePRoject = await projectService.updateProject(
      project_id,
      validated.data,
    );
    return NextResponse.json(
      { message: "Successfully edited", project: updatePRoject },
      { status: 200 },
    );
  } catch (error) {
    console.error( error);
    return NextResponse.json(
      { error: "An error occurred while editing" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: params },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    const { project_id } = await params;
    const project = await projectService.getProjectById(project_id);
    if (project.ownerId != userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    const existingProject = await projectService.getProjectById(project_id);
    if (!existingProject) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 },
      );
    }
    await projectService.deleteProject(project_id);

    return NextResponse.json(
      { message: "Project removed successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
  }
};
