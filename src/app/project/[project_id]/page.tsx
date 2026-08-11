import { ListTodo } from "lucide-react";
import CreateTaskModal from "@/src/components/UI/CreateTaskModal";
import { auth } from "@/auth";
import { PrismaProjectRepository } from "@/src/infrastructure/repositories/PrismaProjectRepository";
import { ProjectService } from "@/src/domain/service/ProjectService";
import { PrismaTaskRepsitroy } from "@/src/infrastructure/repositories/PrismaTaskRepository";
import { TaskService } from "@/src/domain/service/TaskService";
import EditProjectModal from "@/src/components/UI/EditProjectModal";
import DeletProjectModal from "@/src/components/UI/DeleteProjectModal";
import TaskModal from "@/src/components/UI/TaskModal";

type Params = Promise<{ project_id: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
  const { project_id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const projectRepository = new PrismaProjectRepository();
  const projectServer = new ProjectService(projectRepository);
  const taskRepository = new PrismaTaskRepsitroy();
  const taskServer = new TaskService(taskRepository);
  const project = await projectServer.getProjectById(project_id);
  const tasks = await taskServer.gitProjectTaske(project_id);
  return (
    <div
      dir="rtl"
      className="min-h-screen dark:bg-[#0B0F19] dark:text-slate-100 p-6 md:p-10 space-y-8"
    >
      <div className="dark:bg-[#131825] border dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white tracking-wide">
          {project.title}
        </h1>

        <p className="dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-4xl">
          {project.description}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <ListTodo className="w-5 h-5 dark:text-cyan-400" />
        <h2 className="text-xl font-bold dark:text-slate-100">قائمة المهام</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskModal task={task} projectId={project_id} key={task.id} />
        ))}
        <CreateTaskModal projectId={project_id} assigneeId={userId} />
      </div>

      <div className="flex items-center justify-between pt-6">
        <EditProjectModal projectId={project_id} />
        <DeletProjectModal projectId={project_id} />
      </div>
    </div>
  );
}
