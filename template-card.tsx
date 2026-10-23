import Link from "next/link";
import { ArrowUpLeft, Sparkles } from "lucide-react";
import type { Template } from "@/lib/templates";

export function TemplateArt({ template, compact = false }: { template: Template; compact?: boolean }) {
  return (
    <div className={`template-art ${template.theme}`} style={{ minHeight: compact ? 220 : undefined }}>
      <div className="art-content">
        <div className="art-small">دعوة خاصة من INVITO</div>
        <div className="art-line"/>
        <div className="art-title">{template.title}</div>
        <div className="art-line"/>
        <div className="art-small">{template.category} · لحظة لا تُنسى</div>
      </div>
    </div>
  );
}

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="card group">
      <Link href={`/editor?template=${template.slug}`} className="block">
        <div className="relative">
          <TemplateArt template={template} compact/>
          {template.tag && <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#8e6b3e]"><Sparkles size={12} className="ml-1 inline"/> {template.tag}</span>}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-xs text-[#8e6b3e]">{template.category}</p><h3 className="mt-1 text-lg font-bold">{template.title}</h3></div>
            <p className="whitespace-nowrap text-sm font-bold">{template.price.toLocaleString("en-US")} د.ع</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#77716a]">{template.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">خصّص هذا القالب <ArrowUpLeft size={16}/></span>
        </div>
      </Link>
    </article>
  );
}
