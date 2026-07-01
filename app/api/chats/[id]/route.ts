import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  db.prepare("DELETE FROM chat_messages WHERE chat_id = ?").run(id);
  db.prepare("DELETE FROM chats WHERE id = ?").run(id);

  return NextResponse.json({
    success: true,
  });
}