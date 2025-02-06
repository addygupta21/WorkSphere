export const STATUS = {
    ALL: 'all',
    COMPLETED: 'completed',
    IN_PROGRESS: 'in-progress',
    NOT_STARTED: 'not-started'
} as const;

export type TStatus = (typeof STATUS)[keyof typeof STATUS];