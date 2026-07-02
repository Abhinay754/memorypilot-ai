import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const result = await db.execute(`
    SELECT id, filename, content, created_at
    FROM documents
    ORDER BY id DESC
  `);

  const documents = result.rows.map((row) => ({
    id: Number(row.id),
    filename: String(row.filename),
    content: String(row.content),
    created_at: String(row.created_at),
  }));

  return NextResponse.json(documents);
}