import type { UUID } from "crypto";

export interface User {
    id: UUID;
    name: string;
    loginId: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
