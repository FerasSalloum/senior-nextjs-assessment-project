"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import { toast } from "sonner";


const CreateProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axios.post("/api/project",{
        title,
        description
      })
      if (res.status === 201 || res.status === 200) {
        setIsOpen(false);
        setTitle("");
        setDescription("");
        toast.success("تم انشاء المشروع بنجاح")
        router.refresh();
    }} catch (error) {
      console.error(error);
      toast.error(String(error))
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <LoadingOverlay isLoading={isLoading}/>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group min-h-70 dark:bg-[#131825]/40 border-2 border-dashed dark:border-slate-800/80 dark:hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer dark:hover:bg-[#131825]/80 w-full"
      >
        <div className="w-12 h-12 dark:bg-[#1A202C] border dark:border-slate-700/60 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 dark:group-hover:border-cyan-500/50 dark:text-slate-400 dark:group-hover:text-cyan-400 transition-all">
          <Plus className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold dark:text-slate-200 mb-1 dark:group-hover:text-cyan-300 transition-colors">
          إنشاء مشروع جديد
        </h3>
        <p className="text-xs dark:text-slate-500 max-w-50 leading-relaxed">
          ابدأ مساحة عمل جديدة لتنظيم المهام
        </p>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="dark:bg-[#131825] bg-white border dark:border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-5 text-right shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-4 top-4 dark:text-slate-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold dark:text-white">إضافة مشروع جديد</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium dark:text-slate-400 mb-1">
                  اسم المشروع
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full dark:bg-[#0B0F19] border dark:border-slate-800 rounded-xl p-3 dark:text-slate-100 text-sm focus:outline-none dark:focus:border-cyan-500"
                  placeholder="مثال: تطوير المنصة"
                />
              </div>

              <div>
                <label className="block text-xs font-medium dark:text-slate-400 mb-1">
                  الوصف
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full dark:bg-[#0B0F19] border dark:border-slate-800 rounded-xl p-3 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500 h-24 placeholder-gray-300"
                  placeholder="وصف مختصر للمشروع..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-sm transition-all disabled:opacity-50"
                >
                  حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default CreateProjectModal;
