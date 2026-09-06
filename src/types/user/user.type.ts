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

    profile: IUserProfile | null;
    topicInterests: IUserTopicInterest[];
    skillInterests: IUserSkillInterest[];
    careerInterests: IUserCareerInterest[];
    preferenceSettings: IUserPreferenceSettings | null;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface IUserProfile {
    careerFieldId: string | null;
    currentRoleId: string | null;
    experienceLevel: string | null;
    employmentStatus: string | null;
    countryCode: string | null;
    city: string | null;
    timezone: string | null;
    careerField: INamedEntity | null;
    currentRole: INamedEntity | null;
    careerGoals: IUserCareerGoal[];
}

export interface INamedEntity {
    id: string;
    name: string;
}

export interface IUserCareerGoal {
    careerGoalId: string;
    priority: number;
    careerGoal: INamedEntity;
}

export interface IUserTopicInterest {
    topicId: string;
    weight: number;
    topic: INamedEntity;
}

export interface IUserSkillInterest {
    skillId: string;
    weight: number;
    skill: INamedEntity;
}

export interface IUserCareerInterest {
    careerFieldId: string;
    weight: number;
    careerField: INamedEntity;
}

export interface IUserPreferenceSettings {
    showBreakingNews: boolean;
    showCareerNews: boolean;
    notificationsEnabled: boolean;
    pushNotifications: boolean;
    emailNotifications: boolean;
    personalizationEnabled: boolean;
}

export type UpdateUserInput = Partial<
    Pick<IUser, "firstName" | "lastName" | "username" | "avatar" | "bio">
> & {
    profile?: Partial<Pick<IUserProfile,
        "careerFieldId" | "currentRoleId" | "experienceLevel" | "employmentStatus" | "countryCode" | "city" | "timezone"
    >>;
    careerGoals?: Array<Pick<IUserCareerGoal, "careerGoalId" | "priority">>;
    topicInterests?: Array<Pick<IUserTopicInterest, "topicId" | "weight">>;
    skillInterests?: Array<Pick<IUserSkillInterest, "skillId" | "weight">>;
    careerInterests?: Array<Pick<IUserCareerInterest, "careerFieldId" | "weight">>;
    preferences?: Partial<IUserPreferenceSettings>;
};
