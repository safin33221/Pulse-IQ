import { IUser } from "../user/user.type";

export interface LoginState {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export const initialLoginState: LoginState = {
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
