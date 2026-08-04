import {
  User,
  ArrowLeft,
  CheckCircle2,
  ListTodo,
  } from "lucide-react";
import Link from "next/link";
import CreateTaskModal from "@/src/components/UI/CreateTaskModal";
import { auth } from "@/auth";
import { PrismaProjectRepository } from "@/src/infrastructure/repositories/PrismaProjectRepository";
import { ProjectService } from "@/src/domain/service/ProjectService";
import { PrismaTaskRepsitroy } from "@/src/infrastructure/repositories/PrismaTaskRepository copy";
import { TaskService } from "@/src/domain/service/TaskService";
import EditProjectModal from "@/src/components/UI/EditProjectModal";
import DeletProjectModal from "@/src/components/UI/DeleteProjectModal";

type Params = Promise<{ id: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const userName = session?.user?.name;
  const projectRepository = new PrismaProjectRepository();
  const projectServer = new ProjectService(projectRepository);
  const taskRepository = new PrismaTaskRepsitroy();
  const taskServer = new TaskService(taskRepository);
  const project = await projectServer.getProjectById(id);
  const tasks = await taskServer.gitProjectTaske(id);
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0B0F19] text-slate-100 p-6 md:p-10 space-y-8"
    >
      <div className="bg-[#131825] border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          {project.title}
        </h1>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-4xl">
          {project.description}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <ListTodo className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-slate-100">قائمة المهام</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-[#131825] border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between h-36 transition-all hover:border-slate-700/80 relative group ${
              task.status == "DONE" ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3
                className={`text-sm font-semibold text-slate-200 line-clamp-2 ${
                  task.status == "DONE" ? "line-through text-slate-500" : ""
                }`}
              >
                {task.title}
              </h3>

              {task.status == "DONE" ? (
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              ) : (
                <Link
                  href={`/tasks/${task.id}`}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-3 border-t border-slate-800/40">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <User className="w-3 h-3 text-slate-400" />
              </div>
              <span>مسند إلى: {userName}</span>
            </div>
          </div>
        ))}
        <CreateTaskModal projectId={id} assigneeId={userId} />
      </div>

      <div className="flex items-center justify-between pt-6">
        <EditProjectModal projectId={id} />
        <DeletProjectModal projectId={id} />
      </div>
    </div>
  );
}
