import { NextResponse } from "next/server";
import db from "@/lib/db";
import { randomUUID } from "crypto";

export async function GET() {
  const chats = db
    .prepare("SELECT * FROM chats ORDER BY created_at DESC")
    .all();

  return NextResponse.json(chats);
}

export async function POST() {
  const id = randomUUID();

  db.prepare(
    "INSERT INTO chats (id, title) VALUES (?, ?)"
  ).run(id, "New Chat");

  return NextResponse.json({
    id,
    title: "New Chat",
  });
}