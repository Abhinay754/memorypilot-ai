import db from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { memory } from "@/lib/memory";
import { knowledge } from "@/lib/knowledge";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const text = message.toLowerCase();

    if (text.includes("my name is")) {
  const name = message.split(/my name is/i)[1]?.trim();

  await db.execute({
  sql: `
    INSERT INTO profile(key, value)
    VALUES (?, ?)
    ON CONFLICT(key)
    DO UPDATE SET value = excluded.value
  `,
  args: ["name", name],
});
}

if (text.includes("i am") && /\d+/.test(text)) {
  const age = text.match(/\d+/)?.[0];

  await db.execute({
  sql: `
    INSERT INTO profile(key, value)
    VALUES (?, ?)
    ON CONFLICT(key)
    DO UPDATE SET value = excluded.value
  `,
  args: ["age", age],
});
}

if (text.includes("i live in")) {
  const city = message.split(/i live in/i)[1]?.trim();

  await db.execute({
  sql: `
    INSERT INTO profile(key, value)
    VALUES (?, ?)
    ON CONFLICT(key)
    DO UPDATE SET value = excluded.value
  `,
  args: ["city", city],
});
}

if (text.includes("my name is")) {
  knowledge.name = message.split(/my name is/i)[1]?.trim();
}

if (text.includes("i am") && /\d+/.test(text)) {
  knowledge.age = text.match(/\d+/)?.[0];
}

if (text.includes("favorite color is")) {
  const color = message.split(/favorite color is/i)[1]?.trim();

  await db.execute({
  sql: `
    INSERT INTO profile(key, value)
    VALUES (?, ?)
    ON CONFLICT(key)
    DO UPDATE SET value = excluded.value
  `,
  args: ["favoriteColor", color],
});
}

if (text.includes("i live in")) {
  knowledge.city = message.split(/i live in/i)[1]?.trim();
}

if (text.includes("favorite color is")) {
  knowledge.favoriteColor =
    message.split(/favorite color is/i)[1]?.trim();
}

    await db.execute({
  sql: "INSERT INTO memories (role, message) VALUES (?, ?)",
  args: ["user", message],
});

memory.push({
  role: "user",
  text: message,
});

const result = await db.execute(
  "SELECT role, message FROM memories ORDER BY id ASC LIMIT 50"
);

const rows = result.rows;

const profileResult = await db.execute(
  "SELECT key, value FROM profile"
);

const profileRows = profileResult.rows.map((row) => ({
  key: String(row.key),
  value: String(row.value),
}));

const profile = profileRows
  .map((item) => `${item.key}: ${item.value}`)
  .join("\n");

const conversation =
  "User Profile:\n" +
  profile +
  "\n\nConversation:\n" +
  rows.map((m) => `${m.role}: ${m.message}`).join("\n");

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: conversation,
});

await db.execute({
  sql: "INSERT INTO memories (role, message) VALUES (?, ?)",
  args: ["model", response.text ?? ""],
});

memory.push({
  role: "model",
  text: response.text ?? "",
});

    return Response.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}