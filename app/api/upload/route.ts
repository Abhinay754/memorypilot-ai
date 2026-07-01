// import { NextRequest, NextResponse } from "next/server";
// import pdfParse from "pdf-parse";
// import db from "@/lib/db";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json(
//         { error: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const pdf = await pdfParse(buffer);
//     const text = pdf.text;

//     db.prepare(
//       "INSERT INTO memories (role, message) VALUES (?, ?)"
//     ).run("document", text);

//     db.prepare(`
//       INSERT INTO documents (filename, content)
//       VALUES (?, ?)
//     `).run(file.name, text);

//     return NextResponse.json({
//       success: true,
//       text,
//     });
//   } catch (err) {
//     console.error("PDF Upload Error:", err);

//     return NextResponse.json(
//       { error: "Upload failed" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: false,
    message: "PDF upload temporarily disabled for deployment.",
  });
}