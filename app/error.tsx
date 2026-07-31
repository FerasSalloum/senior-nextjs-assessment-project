"use client";
import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import MainButoon from "../src/components/UI/MainButoon";
import DarkButoon from "../src/components/UI/DarkButoon";
import { useRouter } from "next/navigation";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode: number };
  reset: () => void;
}) => {
  const router = useRouter();
  const errorStatusCode = error.statusCode || 500;
  const errorMessage = error.message || "حدث خطاء غير متوقع اثناء معالجة الطلب";
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-9xl sm:text-[11rem] font-bold text-red-900 tracking-wider select-none leading-none [text-shadow:15px_-15px_5px_#00b8db8f]">
          {errorStatusCode}
        </h1>
        <span className="text-lg text-gray-500">{errorMessage}</span>
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
          <div
            onClick={() => {
              reset();
            }}
          >
            <DarkButoon text="اعادة المحاولة" icon={<RotateCcw />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
