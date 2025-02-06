export const SORTING = {
    PRIORITY: 'priority',
    DUE_DATE: 'dueDate'
} as const;

export type TSorting = (typeof SORTING)[keyof typeof SORTING];