import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json([]);
  }

  const result = await db.execute({
  sql: `
    SELECT role, message
    FROM chat_messages
    WHERE chat_id = ?
    ORDER BY id ASC
  `,
  args: [chatId],
});

const messages = result.rows.map((row) => ({
  role: String(row.role),
  message: String(row.message),
}));

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const { chatId, role, message } = await req.json();

  await db.execute({
  sql: `
    INSERT INTO chat_messages (chat_id, role, message)
    VALUES (?, ?, ?)
  `,
  args: [chatId, role, message],
});
  return NextResponse.json({
    success: true,
  });
}