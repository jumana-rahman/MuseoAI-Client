import { apiRequest } from "./api";
import type { Museum } from "./museums";

export interface AIChatResponse {
  reply: string;
  conversationId: string | null;
}

export interface AIRecommendation extends Museum {
  reason: string;
}

export const aiService = {
  museumChat: (data: {
    museumId: string;
    message: string;
    conversationId?: string;
  }) =>
    apiRequest<AIChatResponse>("/ai/museum-guide", {
      method: "POST",
      body: data,
    }),

  recommendations: (data: {
    interests?: string[];
    preferredCountry?: string;
    budget?: number;
    travelDuration?: string;
    travelType?: string;
  }) =>
    apiRequest<AIRecommendation[]>("/ai/recommendations", {
      method: "POST",
      body: data,
    }),

  recordSignal: (museumId: string, signalType: string) =>
    apiRequest("/ai/signals", {
      method: "POST",
      body: { museumId, signalType },
    }),
};
