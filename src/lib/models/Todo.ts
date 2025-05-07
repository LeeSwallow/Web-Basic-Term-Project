import type { UUID } from "crypto";

export interface Todo {
    id: UUID;
    content: string;
    completed: boolean;
    pomodoroCount: number;
    minPomodoroCount: number;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
};

