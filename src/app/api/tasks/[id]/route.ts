import { TaskService } from "@/src/domain/service/TaskService";
import { PrismaTaskRepsitroy } from "@/src/infrastructure/repositories/PrismaTaskRepository copy";
import { UpdateTaskSchema } from "@/src/validators/schemas";
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

type Params = Promise<{ id: string }>;

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Params },
) => {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const { id } = await params;

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

    const validation = UpdateTaskSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid update data", details: validation.error.format() },
        { status: 400 },
      );
    }

    // التحديث في قاعدة البيانات
    const updatedTask = await taskRepository.update(id, validation.data);
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task updated successfully", task: updatedTask },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Params },
) => {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const { id } = await params;

    await taskRepository.delete(id);

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
};
