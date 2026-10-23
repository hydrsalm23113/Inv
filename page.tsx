 "use client";
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Heart, CheckCircle2 } from "lucide-react";
import { getTemplate, templates } from "@/lib/templates";
import { TemplateArt } from "@/components/template-card";

type Invitation = { id:string; slug:string; templateSlug:string; eventType:string; hostNames:string; date:string; time:string; venue:string; address:string; message:string; price:number; createdAt:string; rsvp:boolean; };
export default function PublicInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug,setSlug] = useState("");
  const [invitation,setInvitation] = useState<Invitation|null>(null);
  const [guest,setGuest] = useState("");
  const [attending,setAttending] = useState("yes");
  const [guests,setGuests] = useState("1");
  const [sent,setSent] = useState(false);
  useEffect(()=>{ params.then(p=>setSlug(p.slug)); },[params]);
  useEffect(()=>{ if(!slug) return; try { const all = JSON.parse(localStorage.getItem("invito-invitations") || "[]"); setInvitation(all.find((i:Invitation)=>i.slug===slug)||null); } catch {} },[slug]);
  const template = getTemplate(invitation?.templateSlug || "") || templates[0];
  function submitRsvp(e:React.FormEvent){e.preventDefault(); const key=`invito-rsvp-${slug}`; const old=JSON.parse(localStorage.getItem(key)||"[]"); localStorage.setItem(key,JSON.stringify([{guest,attending,guests,createdAt:new Date().toISOString()},...old])); setSent(true);}
  if(!slug) return <div className="container section">جاري تحميل الدعوة...</div>;
  if(!invitation) return <section className="container section"><div className="mx-auto max-w-xl rounded-2xl border border-[#e8e0d6] bg-white p-10 text-center"><Heart className="mx-auto text-[#ad8755]" size={28}/><h1 className="serif mt-4 text-3xl">دعوة خاصة</h1><p className="mt-3 text-sm leading-7 text-[#77716a]">لم يتم العثور على هذه الدعوة على هذا الجهاز. قد يكون الرابط تجريبياً أو أن الدعوة لم تُنشر على قاعدة بيانات مشتركة بعد.</p><a className="btn btn-primary mt-6" href="/templates">تصفّح القوالب</a></div></section>;
  return <section className="container section"><div className="mx-auto max-w-2xl overflow-hidden rounded-[26px] border border-[#e8e0d6] bg-white shadow-xl"><TemplateArt template={template}/><div className="p-6 text-center md:p-10"><p className="eyebrow">دعوة خاصة من INVITO</p><h1 className="serif mt-4 text-3xl md:text-5xl">{invitation.hostNames}</h1><p className="mx-auto mt-5 max-w-lg leading-8 text-[#77716a]">{invitation.message}</p><div className="my-7 grid gap-3 rounded-2xl bg-[#fbf8f3] p-5 text-sm"><p><CalendarDays size={17} className="ml-2 inline text-[#ad8755]"/>{invitation.date || "سيتم تحديد التاريخ"} · {invitation.time}</p><p><MapPin size={17} className="ml-2 inline text-[#ad8755]"/>{invitation.venue}</p><p className="text-[#77716a]">{invitation.address}</p></div>{invitation.rsvp && <div className="rounded-2xl border border-[#e8e0d6] p-5 text-right"><h2 className="text-lg font-bold">تأكيد الحضور</h2>{sent ? <p className="mt-4 text-sm text-green-700"><CheckCircle2 className="ml-2 inline"/> شكراً لك، تم حفظ الرد على هذا الجهاز التجريبي.</p> : <form onSubmit={submitRsvp} className="mt-4 space-y-4"><div><label className="mb-2 block text-sm">اسمك</label><input className="field" required value={guest} onChange={e=>setGuest(e.target.value)}/></div><div><label className="mb-2 block text-sm">هل ستحضر؟</label><select className="field" value={attending} onChange={e=>setAttending(e.target.value)}><option value="yes">نعم، سأحضر</option><option value="no">أعتذر عن الحضور</option><option value="maybe">ربما</option></select></div><div><label className="mb-2 block text-sm">عدد الحاضرين معك</label><select className="field" value={guests} onChange={e=>setGuests(e.target.value)}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}</select></div><button className="btn btn-primary w-full">إرسال الرد</button></form>}</div>}<p className="mt-7 text-[10px] tracking-[.2em] text-[#ad8755]">MADE WITH INVITO</p></div></div></section>;
}
