import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const documents = db
    .prepare(
      `SELECT id, filename, content, created_at
       FROM documents
       ORDER BY id DESC`
    )
    .all();

  return NextResponse.json(documents);
}