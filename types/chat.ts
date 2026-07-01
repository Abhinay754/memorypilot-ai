export type ChatSession = {
  id: string;
  title: string;
  createdAt: number;
};

export type ChatMessage = {
  role: "user" | "ai";
  text: string;
};