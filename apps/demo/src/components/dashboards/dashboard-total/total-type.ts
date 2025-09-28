export const TotalType = {
  currency: 1,
  int: 2,
} as const;

export type TotalType = (typeof TotalType)[keyof typeof TotalType];
