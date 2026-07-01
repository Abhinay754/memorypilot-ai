import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const profile = db
    .prepare("SELECT key, value FROM profile")
    .all();

  return NextResponse.json({
    profile,
  });
}