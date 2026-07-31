"use client";
import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import MainButoon from "../src/components/UI/MainButoon";
import DarkButoon from "../src/components/UI/DarkButoon";
import { useRouter } from "next/navigation";

const NotFond = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-9xl sm:text-[11rem] font-bold text-red-900 tracking-wider select-none leading-none [text-shadow:15px_-15px_10px_#00b8db8f]">
          404
        </h1>
        <span className="text-2xl font-bold">الصفحة غير متوفرة</span>
        <span className="text-sm text text-gray-500">
          عذرا الصفحة التي تبحث عنها قد تم نقلها او انها غير موجودةفي هذا المسار
        </span>
      </div>
      <div className="flex flex-col md:flex-row ">
        <Link href="/" className="flex">
          <MainButoon text="العودة الى الرئيسية" icon={<ArrowRight />} />
        </Link>
        <div
          onClick={() => {
            router.back();
          }}
        >
          <DarkButoon text="الرجوع للخلف" icon={<RotateCcw />} />
        </div>
      </div>
    </div>
  );
};

export default NotFond;
