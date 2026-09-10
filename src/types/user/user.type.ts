export type IUserRole = "USER" | "ADMIN" | "MODERATOR";
export type IUserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";

export interface IUser {
  id: string;
  email: string;
  username: string | null;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  role: IUserRole;
  status: IUserStatus;
  emailVerified: boolean;
  lastLoginAt: string | null;
  professionalProfile: IProfessionalProfile | null;
  createdAt: string;
  updatedAt: string;
}

export interface IProfessionalProfile {
  id: string;
  userId: string;
  jobTitle: string | null;
  company: string | null;
  industry: string | null;
  location: string | null;
  yearsOfExperience: number | null;
  linkedinUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UpdateMyProfileDto = Partial<Pick<IUser, "name" | "username" | "avatar" | "bio">> & {
  professionalProfile?: Partial<Pick<IProfessionalProfile, "jobTitle" | "company" | "industry" | "location" | "yearsOfExperience" | "linkedinUrl">>;
};
