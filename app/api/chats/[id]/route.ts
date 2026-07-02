import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await db.execute({
    sql: "DELETE FROM chat_messages WHERE chat_id = ?",
    args: [id],
  });

  await db.execute({
    sql: "DELETE FROM chats WHERE id = ?",
    args: [id],
  });

  return NextResponse.json({
    success: true,
  });
}