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