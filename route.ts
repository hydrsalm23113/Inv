import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, app: "INVITO", mode: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "demo", timestamp: new Date().toISOString() });
}
