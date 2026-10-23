import Link from "next/link";
import { Gem, Instagram, Menu } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e8e0d6] bg-[#fbf8f3]/95 backdrop-blur">
      <div className="container flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="INVITO الرئيسية">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#24221f] text-white"><Gem size={17}/></span>
          <span className="serif text-2xl tracking-[.12em]">INVITO</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link className="nav-link" href="/templates">القوالب</Link>
          <Link className="nav-link" href="/#how-it-works">كيف تعمل؟</Link>
          <Link className="nav-link" href="/#pricing">الأسعار</Link>
          <Link className="nav-link" href="/dashboard">دعواتي</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/templates" className="btn btn-primary !px-4 !py-2.5">صمّم دعوتك</Link>
          <button className="rounded-full border border-[#e8e0d6] p-2 md:hidden" aria-label="القائمة"><Menu size={19}/></button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e8e0d6] bg-[#f5efe6] py-10">
      <div className="container grid gap-8 md:grid-cols-3">
        <div>
          <Link href="/" className="serif text-2xl tracking-[.12em]">INVITO</Link>
          <p className="mt-3 max-w-xs text-sm leading-7 text-[#77716a]">دعوات إلكترونية مصممة لتجعل لحظاتكم الخاصة أقرب إلى القلب.</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-[#625d56]">
          <Link href="/templates">تصفّح القوالب</Link><Link href="/dashboard">دعواتي</Link><Link href="/admin">لوحة الإدارة التجريبية</Link>
        </div>
        <div className="text-sm leading-7 text-[#77716a]">
          <p>تحتاج مساعدة؟</p>
          <p>أضف بريد الدعم وروابط التواصل الخاصة بك قبل الإطلاق.</p>
          <p className="mt-2 flex items-center gap-2"><Instagram size={15}/> @invito</p>
        </div>
      </div>
      <div className="container mt-8 border-t border-[#e2d8cb] pt-5 text-xs text-[#898177]">© {new Date().getFullYear()} INVITO. جميع الحقوق محفوظة.</div>
    </footer>
  );
}
