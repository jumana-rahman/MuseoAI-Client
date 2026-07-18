import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "../services/reviews";

export function useMuseumReviews(museumId: string) {
  return useQuery({
    queryKey: ["reviews", museumId],
    queryFn: () => reviewService.byMuseum(museumId),
    enabled: !!museumId,
  });
}

export function useCreateReview(museumId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; review: string }) =>
      reviewService.create(museumId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", museumId] });
    },
  });
}
