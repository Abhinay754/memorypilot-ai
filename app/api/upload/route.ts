import { NextRequest, NextResponse } from "next/server";
import { getDocument } from "pdfjs-dist";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

   // const pdf = await pdfParse(buffer);
   const pdf = await getDocument({ data: buffer }).promise;

let text = "";

for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);

  const content = await page.getTextContent();

  text +=
    content.items
      .map((item: any) => item.str)
      .join(" ") + "\n";
}

console.log("Extracted Text:");
console.log(text);

    db.prepare(
      "INSERT INTO memories (role, message) VALUES (?, ?)"
    ).run("document", text);

    db.prepare(`
  INSERT INTO documents (filename, content)
  VALUES (?, ?)
`).run(file.name, text);

    return NextResponse.json({
      success: true,
      text: text,
    });
  } catch (err) {
    console.error("PDF Upload Error:", err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}