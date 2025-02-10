export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type TPriority = (typeof PRIORITY)[keyof typeof PRIORITY];
