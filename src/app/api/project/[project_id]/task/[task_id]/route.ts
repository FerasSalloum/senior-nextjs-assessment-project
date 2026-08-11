import { auth } from "@/auth";
import { TaskService } from "@/src/domain/service/TaskService";
import { PrismaTaskRepsitroy } from "@/src/infrastructure/repositories/PrismaTaskRepository";
import { UpdateTaskSchema } from "@/src/validators/schemas";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new PrismaTaskRepsitroy();
const taskService = new TaskService(taskRepository);

type Params = Promise<{ task_id: string }>;

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Params },
) => {
  try {
    // const session =await auth()
    // const userId =  session?.user?.id;
    // if (!userId) {
    //   return NextResponse.json(
    //     { error: "Unauthorized access" },
    //     { status: 401 },
    //   );
    // }

    const { task_id } = await params;

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
    if (validation.data.status) {
      const updatedTask = await taskService.updateTaskStatus(
        task_id,
        validation.data.status,
      );
      if (!updatedTask) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }

      return NextResponse.json(
        { message: "Task updated successfully", task: updatedTask },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(error);
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
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const { task_id } = await params;

    await taskService.deletTaske(task_id);

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
};
