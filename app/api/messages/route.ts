import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json([]);
  }

  const messages = db
    .prepare(
      `SELECT role, message
       FROM chat_messages
       WHERE chat_id = ?
       ORDER BY id ASC`
    )
    .all(chatId);

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const { chatId, role, message } = await req.json();

  db.prepare(
    `INSERT INTO chat_messages
    (chat_id, role, message)
    VALUES (?, ?, ?)`
  ).run(chatId, role, message);

  return NextResponse.json({
    success: true,
  });
}