"use client";
import axios from "axios";
import { ArrowLeft, Flag, PieChart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteTaskModal from "./DeleteTaskModal";

const TaskModal = ({
  task,
}: {
  projectId: string;
  task: {
    id: string;
    title: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    priroity: string;
    dueDate: Date | null;
    projectId: string;
    assigneeId: string | null;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("MEDIUM");
  const [selectedStatus, setSelectedStatus] = useState("TODO");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/project/${task.projectId}/task`, {
        title: title,
        status: selectedStatus,
        priroity: selectedPriority,
        projectId: task.projectId,
        descriptionc: description,
        dueDate: date,
        assigneeId: task.assigneeId,
      });
      if (res.status === 201 || res.status === 200) {
        setIsOpen(false);
        setTitle("");
        setDescription("");
        setDate("");
        setSelectedPriority("MEDIUM");
        setSelectedStatus("TODO");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`bg-[#131825] border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between h-36 transition-all hover:border-slate-700/80 relative group`}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className={`text-sm font-semibold text-slate-200 line-clamp-2 `}>
            {task.title}
          </h3>
          <ArrowLeft className="w-4 h-4 shrink-0" />
        </div>
        <div>
          <div>{task.description}</div>
        </div>
        <div className="flex  items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex flex-row items-start justify-center gap-2">
              <PieChart className="w-5 h-5 text-cyan-300 " />
              <h3 className="text-md font-bold">الحالة</h3>
            </div>
            <div className="flex flex-row items-center justify-between ">
              {task.priroity == "LOW" && (
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    task.priroity == "LOW"
                      ? "bg-[#172722] border-emerald-500/20"
                      : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors ${
                      task.priroity == "LOW"
                        ? "text-emerald-300 font-bold"
                        : "text-slate-300"
                    }`}
                  >
                    منخفضة
                  </span>
                </div>
              )}
              {task.priroity == "MEDIUM" && (
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    task.priroity == "MEDIUM"
                      ? "bg-[#182635] border-cyan-500/20"
                      : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors ${
                      task.priroity == "MEDIUM"
                        ? "text-cyan-300 font-bold"
                        : "text-slate-300"
                    }`}
                  >
                    متوسطة
                  </span>
                </div>
              )}
              {task.priroity == "HIGH" && (
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    task.priroity == "HIGH"
                      ? "bg-[#27231a] border-amber-500/20"
                      : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors ${
                      task.priroity == "HIGH"
                        ? "text-amber-300 font-bold"
                        : "text-slate-300"
                    }`}
                  >
                    عالية
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex flex-row items-start justify-center gap-2">
              <Flag className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              <h3 className="text-md font-bold">الأولوية</h3>
            </div>
            <div className="flex flex-row items-center justify-between ">
              {task.status == "TODO" && (
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    task.status == "TODO"
                      ? "bg-[#172722] border-emerald-500/20"
                      : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors ${
                      task.status == "TODO"
                        ? "text-emerald-300 font-bold"
                        : "text-slate-300"
                    }`}
                  >
                    قيد الانتظار
                  </span>
                </div>
              )}
              {task.status == "IN_PROGRESS" && (
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    task.status == "IN_PROGRESS"
                      ? "bg-[#182635] border-cyan-500/20"
                      : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors ${
                      task.status == "IN_PROGRESS"
                        ? "text-cyan-300 font-bold"
                        : "text-slate-300"
                    }`}
                  >
                    جار التنفيذ
                  </span>
                </div>
              )}
              {task.status == "DONE" && (
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    task.status == "DONE"
                      ? "bg-[#27231a] border-amber-500/20"
                      : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                  }`}
                >
                  <span
                    className={`text-sm transition-colors ${
                      task.status == "DONE"
                        ? "text-amber-300 font-bold"
                        : "text-slate-300"
                    }`}
                  >
                    مكتمل
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed overflow-y-scroll  max-h-screen inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm pt-36 pb-2.5">
          <div className="bg-[#131825] border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-5 text-right shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white">تعديل حالة المهمة</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                dir="rtl"
                className="bg-transparent max-w-lg w-full space-y-5"
              >
                <div className="flex items-center justify-start gap-2 text-slate-100">
                  <PieChart className="w-5 h-5 text-cyan-300 " />
                  <h3 className="text-md font-bold">الحالة</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedStatus("TODO")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedStatus == "TODO"
                        ? "bg-[#172722] border-emerald-500/20"
                        : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-1 rounded-full mb-3 transition-all duration-300 ${
                        selectedStatus == "TODO"
                          ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                          : "bg-slate-700/60"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors ${
                        selectedStatus == "TODO"
                          ? "text-emerald-300 font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      قيد الانتظار
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus("IN_PROGRESS")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedStatus == "IN_PROGRESS"
                        ? "bg-[#182635] border-cyan-500/20"
                        : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-1 rounded-full mb-3 transition-all duration-300 ${
                        selectedStatus == "IN_PROGRESS"
                          ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                          : "bg-slate-700/60"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors ${
                        selectedStatus == "IN_PROGRESS"
                          ? "text-cyan-300 font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      جار التنفيذ
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus("DONE")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedStatus == "DONE"
                        ? "bg-[#27231a] border-amber-500/20"
                        : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-1 rounded-full mb-3 transition-all duration-300 ${
                        selectedStatus == "DONE"
                          ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                          : "bg-slate-700/60"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors ${
                        selectedStatus == "DONE"
                          ? "text-amber-300 font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      مكتمل
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <DeleteTaskModal TaskId={task.id} projectId={task.projectId} />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-sm transition-all disabled:opacity-50"
                >
                  {loading ? "جاري الحفظ..." : "حفظ المهمة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
