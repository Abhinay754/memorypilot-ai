type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export const memory: ChatMessage[] = [];