import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full bg-slate-900 p-2 text-white flex items-center justify-around min-h-16 flex-col-reverse md:flex-row gap-3 ">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-around gap-3">
          <Link href="/" className="text-sm hover:text-blue-400">
            الرئيسية
          </Link>
          <Link href="/profile" className="text-sm hover:text-blue-400">
            الملف الشخصي
          </Link>
        </div>
        <div>
          <p className="text-xs text-slate-300">
            © {currentYear} JEST DOET. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
      <div>
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-cyan-200 hover:text-cyan-100 transition-colors"
        >
          JEST DOET
        </Link>
      </div>
    </div>
  );
};

export default Footer;
