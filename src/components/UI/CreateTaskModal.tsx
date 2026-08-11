"use client";

import { useState } from "react";
import { Flag, Plus, X, PieChart } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import { toast } from "sonner";


const CreateTaskModal = ({
  projectId,
  assigneeId,
}: {
  projectId: string;
  assigneeId: string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("MEDIUM");
  const [selectedStatus, setSelectedStatus] = useState("TODO");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/project/${projectId}/task`, {
        title: title,
        status: selectedStatus,
        priroity: selectedPriority,
        projectId: projectId,
        descriptionc: description,
        dueDate: date,
        assigneeId: assigneeId,
      });
      if (res.status === 201 || res.status === 200) {
        setIsOpen(false);
        setTitle("");
        setDescription("");
        setDate("");
        setSelectedPriority("MEDIUM");
        setSelectedStatus("TODO");
        toast.success("تم انشاء المهمة بنجاح")
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error(String(error))
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <LoadingOverlay isLoading={isloading}/>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group min-h-30 dark:bg-[#131825]/40 border-2 border-dashed dark:border-slate-800/80 dark:hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer dark:hover:bg-[#131825]/80 w-full"
      >
        <div className="w-12 h-12 dark:bg-[#1A202C] border dark:border-slate-700/60 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-500/50 dark:text-slate-400 group-hover:text-cyan-400 transition-all">
          <Plus className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold dark:text-slate-200 mb-1 group-hover:text-cyan-300 transition-colors">
          إنشاء مهمة جديد
        </h3>
      </button>

      {isOpen && (
        <div className="fixed overflow-y-scroll  max-h-screen inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm pt-36 pb-2.5">
          <div className="dark:bg-[#131825] bg-white border dark:border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-5 text-right shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-4 top-4 dark:text-slate-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold dark:text-white">إضافة مهمة جديد</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium dark:text-slate-400 mb-1">
                  اسم المهمة
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full dark:bg-[#0B0F19] border dark:border-slate-800 rounded-xl p-3 dark:text-slate-100 text-sm focus:outline-none dark:focus:border-cyan-500"
                  placeholder="عنوان المهمة "
                />
              </div>
              <div>
                <label className="block text-xs font-medium dark:text-slate-400 mb-1">
                  الوصف
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full dark:bg-[#0B0F19] border dark:border-slate-800 rounded-xl p-3 dark:text-slate-100 text-sm focus:outline-none dark:focus:border-cyan-500 h-24"
                  placeholder="وصف مختصر للمهمة..."
                />
              </div>
              <div
                dir="rtl"
                className="bg-transparent max-w-lg w-full space-y-5"
              >
                <div className="flex items-center justify-start gap-2 dark:text-slate-100">
                  <PieChart className="w-5 h-5 dark:text-cyan-300 " />
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
              <div
                dir="rtl"
                className="bg-transparent max-w-lg w-full space-y-5"
              >
                <div className="flex items-center justify-start gap-2 dark:text-slate-100">
                  <Flag className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  <h3 className="text-md font-bold">الأولوية</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPriority("LOW")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedPriority == "LOW"
                        ? "bg-[#172722] border-emerald-500/20"
                        : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-1 rounded-full mb-3 transition-all duration-300 ${
                        selectedPriority == "LOW"
                          ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                          : "bg-slate-700/60"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors ${
                        selectedPriority == "LOW"
                          ? "text-emerald-300 font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      منخفضة
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPriority("MEDIUM")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedPriority == "MEDIUM"
                        ? "bg-[#182635] border-cyan-500/20"
                        : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-1 rounded-full mb-3 transition-all duration-300 ${
                        selectedPriority == "MEDIUM"
                          ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                          : "bg-slate-700/60"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors ${
                        selectedPriority == "MEDIUM"
                          ? "text-cyan-300 font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      متوسطة
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPriority("HIGH")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedPriority == "HIGH"
                        ? "bg-[#27231a] border-amber-500/20"
                        : "bg-[#191e2e]/60 border-slate-800/60 hover:bg-[#191e2e] text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-1 rounded-full mb-3 transition-all duration-300 ${
                        selectedPriority == "HIGH"
                          ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                          : "bg-slate-700/60"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors ${
                        selectedPriority == "HIGH"
                          ? "text-amber-300 font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      عالية
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium dark:text-slate-400 mb-1">
                  تاريخ الانتهاء
                </label>
                <input
                  lang="en-US"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full scheme-dark dark:bg-[#0B0F19] text-left border dark:border-slate-800 rounded-xl p-3 dark:text-slate-100 text-sm focus:outline-none dark:focus:border-cyan-500 placeholder-gray-300"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm dark:text-slate-400 dark:hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-sm transition-all disabled:opacity-50"
                >
                  حفظ المهمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default CreateTaskModal;
