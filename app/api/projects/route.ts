import { ProjectService } from "@/src/domain/service/ProjectService";
import { PrismaProjectRepository } from "@/src/infrastructure/repositories/PrismaProjectRepository";
import { ProjectSchema } from "@/src/validators/schemas";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const projrectRepositry = new PrismaProjectRepository();
const projectService = new ProjectService(projrectRepositry);

const getUserIdFromToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    return decoded.id;
  } catch (error) {
    return null;
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getUserIdFromToken();
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
    const userId = await getUserIdFromToken();
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
    console.error("POST Progects Error");
    console.error("❌ تفاصيل الخطأ الكاملة:", error);
    return NextResponse.json(
      { error: "Error creating project" },
      { status: 500 },
    );
  }
};
