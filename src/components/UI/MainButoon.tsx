import { ReactNode } from "react";

const MainButoon = ({
  text,
  icon,
}: {
  text: string | null;
  icon: ReactNode;
}):ReactNode => {
  return (
    <div className="grow p-4 space-y-2 overflow-auto cursor-pointer">
      <div className="flex items-center justify-start px-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-800 hover:text-white text-slate-950 font-semibold shadow-md transition-all gap-2">
        {icon}
        {text && <span>{text}</span>}
      </div>
    </div>
  );
};

export default MainButoon;
