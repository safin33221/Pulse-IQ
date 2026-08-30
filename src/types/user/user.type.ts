export type IUserRole =
    | "USER"
    | "ADMIN"
    | "MODERATOR";

export type IUserStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED"
    | "DELETED";

export interface IUser {
    id: string;

    // Authentication
    email: string;
    username: string | null;

    // Profile
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    bio: string | null;

    // Authorization
    role: IUserRole;
    status: IUserStatus;

    // Verification
    emailVerified: boolean;

    // Activity
    lastLoginAt: string | null;

    // AI personalization
    interests: string[];
    preferences: Record<string, unknown> | null;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}