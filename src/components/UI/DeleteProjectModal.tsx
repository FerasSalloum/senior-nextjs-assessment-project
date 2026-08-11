"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { toast } from "sonner";


const DeletProjectModal = ({ projectId }: { projectId: string }) => {
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axios.delete(`/api/project/${projectId}`);
      if (res.status === 201 || res.status === 200) {
        toast.success("تم حذف المشروع بنجاح")
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(String(error))
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
        <LoadingOverlay isLoading={isloading}/>
    <button
      type="button"
      className="bg-transparent hover:bg-red-500/10 border border-red-500/40 text-red-400 font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all cursor-pointer"
      onClick={handleSubmit}
    >
      <span>حذف المشروع</span>
      <Trash2 className="w-4 h-4" />
    </button>
    </>
  );
};
export default DeletProjectModal;
