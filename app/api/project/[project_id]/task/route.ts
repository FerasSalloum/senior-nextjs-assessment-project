
import { auth } from "@/auth";
import { TaskService } from "@/src/domain/service/TaskService";
import { PrismaTaskRepsitroy } from "@/src/infrastructure/repositories/PrismaTaskRepository copy";
import { TaskSchema } from "@/src/validators/schemas";
import { NextRequest, NextResponse } from "next/server";

const taskRepository = new PrismaTaskRepsitroy();
const taskService = new TaskService(taskRepository);


export const POST = async (request: NextRequest) => {
  try {
    const session = await auth()
    const userId =  session?.user?.id 
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
      } catch (error) {
        console.log(error)
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
    console.error( error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const session = await auth()
    const userId =  session?.user?.id 
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
    console.error( error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
};
