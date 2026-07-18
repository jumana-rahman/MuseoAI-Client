import { apiRequest } from "./api";

export interface Review {
  id: string;
  museumId: string;
  userId: string;
  rating: number;
  review: string;
  createdAt: string;
}

export const reviewService = {
  byMuseum: (museumId: string) =>
    apiRequest<Review[]>(`/museums/${museumId}/reviews`),

  create: (museumId: string, data: { rating: number; review: string }) =>
    apiRequest(`/museums/${museumId}/reviews`, {
      method: "POST",
      body: data,
    }),
};
