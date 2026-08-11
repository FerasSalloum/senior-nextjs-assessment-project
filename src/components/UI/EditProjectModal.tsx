"use client";

import { useState } from "react";
import { EditIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import { toast } from "sonner";

const EditProjectModal = ({projectId}:{projectId:string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // دالة الحفظ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`/api/project/${projectId}`, {
        title,
        description,
      });
      if (res.status === 201 || res.status === 200) {
        toast.success("تم تعديل المشروع بنجاح")
        setIsOpen(false);
        setTitle("");
        setDescription("");
        router.refresh();
      }
    } catch (error) {
      toast.error(String(error))
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <LoadingOverlay isLoading={loading}/>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-cyan-200 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg cursor-pointer"
      >
        <EditIcon className="w-4 h-4" />
        <span>تعديل المشروع</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="dark:bg-[#131825] bg-white border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-5 text-right shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-4 top-4 dark:text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold dark:text-white">تعديل المشروع </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  اسم المشروع
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full dark:bg-[#0B0F19] border border-slate-800 rounded-xl p-3 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500 placeholder-gray-400"
                  placeholder="مثال: تطوير المنصة"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  الوصف
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full dark:bg-[#0B0F19] border border-slate-800 rounded-xl p-3 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500 h-24 placeholder-gray-400"
                  placeholder="وصف مختصر للمشروع..."
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
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-sm transition-all disabled:opacity-50"
                >
                  {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProjectModal;
