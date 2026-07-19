import { useMutation } from "@tanstack/react-query";
import { aiService } from "../services/ai";

export function useAIRecommendations() {
  return useMutation({
    mutationFn: (data: {
      interests?: string[];
      preferredCountry?: string;
      budget?: number;
      travelDuration?: string;
      travelType?: string;
    }) => aiService.recommendations(data),
  });
}

export function useRecordSignal() {
  return useMutation({
    mutationFn: (data: { museumId: string; signalType: string }) =>
      aiService.recordSignal(data.museumId, data.signalType),
  });
}
