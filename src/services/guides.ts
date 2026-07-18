import { apiRequest } from "./api";

export interface Guide {
  _id: string;
  title: string;
  museumId: string;
  museumName?: string;
  museumCountry?: string;
  targetAudience: string;
  visitDuration: string;
  shortDescription: string;
  guideContent: string;
  coverImage: string;
  authorId: string;
  createdAt: string;
  likes: number;
  likedBy?: string[];
}

export interface CreateGuidePayload {
  title: string;
  museumId: string;
  targetAudience: string;
  visitDuration: string;
  shortDescription: string;
  guideContent: string;
  coverImage?: string;
}

export interface AIGuideOutput {
  title: string;
  shortDescription: string;
  guideContent: string;
}

export const guideService = {
  latest: () => apiRequest<Guide[]>("/guides/latest"),

  byMuseum: (museumId: string) =>
    apiRequest<Guide[]>(`/guides/museum/${museumId}`),

  mine: () => apiRequest<Guide[]>("/guides/me"),

  getById: (id: string) => apiRequest<Guide>(`/guides/${id}`),

  create: (data: CreateGuidePayload) =>
    apiRequest<{ _id: string; message: string }>("/guides", {
      method: "POST",
      body: data,
    }),

  delete: (id: string) =>
    apiRequest(`/guides/${id}`, { method: "DELETE" }),

  toggleLike: (id: string) =>
    apiRequest<{ liked: boolean; likes: number }>(`/guides/${id}/like`, {
      method: "POST",
    }),

  aiGenerate: (data: {
    museumId: string;
    targetAudience: string;
    visitDuration: string;
    interests?: string[];
    length?: string;
  }) =>
    apiRequest<AIGuideOutput>("/ai/guide-writer", {
      method: "POST",
      body: data,
    }),
};
