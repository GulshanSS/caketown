import { string, boolean, TypeOf, object, number } from "zod";

const payload = {
  body: object({
    username: string({
      required_error: "Username is required",
    }).min(1, { message: "Username cannot be empty" }),
    content: string().optional(),
    city: string().optional(),
    rating: number().optional(),
    status: boolean().optional(),
  }),
};

const params = {
  params: object({
    reviewId: string({
      required_error: "Review Id is required",
    }),
  }),
};

export const createReviewSchema = object({ ...payload });

export const updateReviewSchema = object({ ...params, ...payload });

export const getReviewSchema = object({ ...params });

export const deleteReviewSchema = object({ ...params });

export type CreateReviewInput = TypeOf<typeof createReviewSchema>;
export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>;
export type GetReviewInput = TypeOf<typeof getReviewSchema>;
export type DeleteReviewInput = TypeOf<typeof deleteReviewSchema>;
