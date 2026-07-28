import { TaskService } from "@/src/domain/service/TaskService";
import { PrismaTaskRepsitroy } from "@/src/infrastructure/repositories/PrismaTaskRepository copy";
import { TaskSchema } from "@/src/validators/schemas";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new PrismaTaskRepsitroy();
const taskService = new TaskService(taskRepository);

const getUserIdFromToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    return decoded.id;
  } catch {
    return null;
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

    let body = await request.json();
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON format" },
          { status: 400 },
        );
      }
    }

    const validation = TaskSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid task data", details: validation.error },
        { status: 400 },
      );
    }

    const newTask = await taskService.createTask(validation.data);

    return NextResponse.json(
      { message: "Task created successfully", task: newTask },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
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

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId query parameter is required" },
        { status: 400 },
      );
    }

    const tasks = await taskService.gitProjectTaske(projectId);
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
};
