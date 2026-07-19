import type { Museum } from "./museums";

export interface AIChatResponse {
  reply: string;
  conversationId: string | null;
}

export interface AIRecommendation extends Museum {
  reason: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const aiService = {
  museumChatStream: async (data: {
    museumId: string;
    message: string;
    conversationId?: string;
    onChunk: (text: string) => void;
    onConversationId: (id: string | null) => void;
    onDone: () => void;
    onError: (err: Error) => void;
  }) => {
    const { museumId, message, conversationId, onChunk, onConversationId, onDone, onError } = data;
    try {
      const res = await fetch(`${API_URL}/ai/museum-guide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ museumId, message, conversationId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "AI service unavailable");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const payload = line.slice(6);
            if (payload === "[DONE]") {
              onDone();
              return;
            }
            try {
              const parsed = JSON.parse(payload);
              if (parsed.text) onChunk(parsed.text);
              if (parsed.conversationId !== undefined) onConversationId(parsed.conversationId);
              if (parsed.error) throw new Error(parsed.error);
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
      onDone();
    } catch (err) {
      onError(err instanceof Error ? err : new Error("Unknown error"));
    }
  },

  getConversation: async (museumId: string) => {
    const res = await fetch(`${API_URL}/ai/conversations/${museumId}`, {
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to load conversation");
    }
    return res.json();
  },

  recommendations: async (data: {
    interests?: string[];
    preferredCountry?: string;
    budget?: number;
    travelDuration?: string;
    travelType?: string;
  }) => {
    const res = await fetch(`${API_URL}/ai/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Recommendation service unavailable");
    }
    return res.json();
  },

  recordSignal: async (museumId: string, signalType: string) => {
    const res = await fetch(`${API_URL}/ai/signals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ museumId, signalType }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Failed to record signal");
    }
    return res.json();
  },
};
