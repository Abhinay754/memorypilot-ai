import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.execute(
    "SELECT key, value FROM profile"
  );

  const profile = result.rows.map((row) => ({
    key: String(row.key),
    value: String(row.value),
  }));

  return NextResponse.json(profile);
}