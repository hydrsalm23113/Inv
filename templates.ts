export type Template = {
  id: string; slug: string; title: string; category: string; description: string;
  price: number; theme: "classic" | "rose" | "night" | "sage" | "lilac";
  tag?: string; features: string[];
};

export const templates: Template[] = [
  { id:"iv-001", slug:"golden-moment", title:"اللحظة الذهبية", category:"زفاف", description:"أناقة هادئة بلمسات ذهبية وتفاصيل كلاسيكية.", price:15000, theme:"classic", tag:"الأكثر طلباً", features:["عدّ تنازلي","خرائط الموقع","موسيقى اختيارية"] },
  { id:"iv-002", slug:"rose-promise", title:"وعد الورد", category:"زفاف", description:"ألوان وردية ناعمة ولمسات رومانسية.", price:15000, theme:"rose", features:["تفاصيل المناسبة","خرائط الموقع","رابط قابل للمشاركة"] },
  { id:"iv-003", slug:"royal-night", title:"الليلة الملكية", category:"حنّاء", description:"تصميم غني بدرجات الليل والذهب.", price:15000, theme:"night", features:["عدّ تنازلي","خرائط الموقع","ملاحظات الضيوف"] },
  { id:"iv-004", slug:"olive-garden", title:"حديقة الزيتون", category:"عقد قران", description:"تصميم طبيعي هادئ مستوحى من الحدائق.", price:15000, theme:"sage", features:["تفاصيل المناسبة","خرائط الموقع","رابط قابل للمشاركة"] },
  { id:"iv-005", slug:"lilac-dream", title:"حلم الليلك", category:"تخرّج", description:"ألوان ليلكية رقيقة لبداية فصل جديد.", price:12000, theme:"lilac", features:["عدّ تنازلي","خرائط الموقع","رابط قابل للمشاركة"] },
  { id:"iv-006", slug:"little-star", title:"نجمة صغيرة", category:"مواليد", description:"دعوة ولادة لطيفة بألوان ناعمة.", price:12000, theme:"sage", features:["رسائل تهنئة","تفاصيل المناسبة","رابط قابل للمشاركة"] },
  { id:"iv-007", slug:"birthday-classic", title:"عيد ميلاد كلاسيكي", category:"أعياد ميلاد", description:"احتفال بسيط بلمسة فاخرة.", price:10000, theme:"rose", features:["تفاصيل المناسبة","خرائط الموقع","رابط قابل للمشاركة"] },
  { id:"iv-008", slug:"midnight-blue", title:"أزرق منتصف الليل", category:"تخرّج", description:"ألوان عميقة وتفاصيل ذهبية أنيقة.", price:12000, theme:"night", features:["عدّ تنازلي","خرائط الموقع","رابط قابل للمشاركة"] },
  { id:"iv-009", slug:"soft-bloom", title:"تفتّح ناعم", category:"حنّاء", description:"ورود وألوان دافئة لليلة مميزة.", price:15000, theme:"lilac", features:["تفاصيل المناسبة","خرائط الموقع","رابط قابل للمشاركة"] }
];

export const categories = ["الكل", "زفاف", "حنّاء", "عقد قران", "تخرّج", "مواليد", "أعياد ميلاد"];
export function getTemplate(slug: string) { return templates.find((item) => item.slug === slug); }
