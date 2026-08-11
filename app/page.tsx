import { Folder } from "lucide-react";
import Project from "@/src/components/UI/Project";
import { ProjectProbs } from "@/src/components/UI/Project";
import { PrismaProjectRepository } from "@/src/infrastructure/repositories/PrismaProjectRepository";
import { ProjectService } from "@/src/domain/service/ProjectService";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreateProjectModal from "@/src/components/UI/CreateProjectModal copy";
export const dyamic = "force-dyanimc";
export const revlidate = 0;

const projectRepsitory = new PrismaProjectRepository();
const projectService = new ProjectService(projectRepsitory);

const ProjectsPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const rowProject = await projectService.getUserProject(session.user.id);
  const projectsData: ProjectProbs[] = rowProject as unknown as ProjectProbs[];
  return (
    <div className="min-h-screen dark:bg-[#0B0F19] dark:text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight">المشاريع</h1>
          </div>
          <p className="text-sm dark:text-slate-400">
            نظرة عامة على المشاريع والمهام
          </p>
        </div>
        <div className="flex items-center gap-2 dark:text-slate-200 border-b border-slate-800/60 pb-4">
          <Folder className="w-5 h-5 dark:text-cyan-400" />
          <h2 className="text-lg font-bold">كل المشاريع</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.length > 0 &&
            projectsData.map((project) => {
              return <Project project={project} key={project.id} />;
            })}
          <CreateProjectModal/>
        </div>
      </div>
    </div>
  );
};
export default ProjectsPage;
