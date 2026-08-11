import { TaskService } from "@/src/domain/service/TaskService";
import { PrismaTaskRepsitroy } from "@/src/infrastructure/repositories/PrismaTaskRepository copy";
import { CheckSquare, Square } from "lucide-react";
import Link from "next/link";
export interface ProjectProbs {
  id: string;
  title: string;
  description: string;
}
const taskRepsitory = new PrismaTaskRepsitroy();
const taskservice = new TaskService(taskRepsitory);

export const Project = async ({ project }: { project: ProjectProbs }) => {
  const tasks = await taskservice.gitProjectTaske(project.id);
  return (
    <Link
    href={`project/${project.id}`}
      className="group relative bg-[#131825]/90 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-start shadow-lg overflow-hidden cursor-pointer"
    >
      <h3 className="text-base font-bold text-slate-100 mb-1">
        {project.title}
      </h3>
      <p className="text-xs text-slate-400 mb-6 line-clamp-2">
        {project.description}
      </p>
      <div className="space-y-3 pt-2 border-t border-slate-800/50">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          المهام السارية
        </span>

        <ul className="space-y-2.5">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between text-xs text-slate-300"
            >
              <div className="flex items-center gap-2">
                {task.status == "DONE" ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <span
                  className={
                    task.status == "DONE"
                      ? "line-through text-slate-500"
                      : "text-slate-300"
                  }
                >
                  {task.title}
                </span>
              </div>

              {task.priroity == "LOW" && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded-md border border-green-500/30">
                  {"غير مهمة"}
                </span>
              )}
              {task.priroity == "MEDIUM" && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-yellow-500/20 text-yellow-400 rounded-md border border-yellow-500/30">
                  {"مهمة "}
                </span>
              )}
              {task.priroity == "HIGH" && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-400 rounded-md border border-red-500/30">
                  {"مهمة جدا"}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default Project;
