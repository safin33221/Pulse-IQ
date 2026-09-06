import { IUser } from "../user/user.type";

export interface AuthFieldErrors {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  username?: string[];
  name?: string[];
}

export interface RegisterState {
  success: boolean;
  message?: string;
  redirectTo?: string;
  errors?: AuthFieldErrors;
}

export interface LoginState {
  success: boolean;
  message?: string;
  errors?: Pick<AuthFieldErrors, "email" | "password">;
}

export const initialLoginState: LoginState = {
  success: false,
};

export interface RegisterState {
  success: boolean;
  message?: string;
  errors?: AuthFieldErrors;
}

export const initialRegisterState: RegisterState = {
  success: false,
};

export type CurrentUser = {
  id: string;
  email: string;
  name?: string;
  role: string;
  avatar?: string;
};

export type GetMeResponse = {
  success: boolean;
  message?: string;
  data?: IUser;
};
