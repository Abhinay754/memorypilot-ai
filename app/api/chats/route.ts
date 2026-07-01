import { NextResponse } from "next/server";
import db from "@/lib/turso";
import { randomUUID } from "crypto";

export async function GET() {
  const result = await db.execute(
    "SELECT * FROM chats ORDER BY created_at DESC"
  );

  return NextResponse.json(result.rows);
}

export async function POST() {
  const id = randomUUID();

  await db.execute({
    sql: "INSERT INTO chats (id, title) VALUES (?, ?)",
    args: [id, "New Chat"],
  });

  return NextResponse.json({
    id,
    title: "New Chat",
  });
}