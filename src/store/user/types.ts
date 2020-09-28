export interface User  {
    email: string,
    authenticated: boolean,
    token: string,
    name: string,
    lastName: string
}

export interface Credentials {
    email: string,
    password: string,
}

export interface Auth {
    authenticated: boolean,
}
export const LOG_USER = "LOG_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER_DATA = "SET_USER_DATA";
export const AUTH_USER = "AUTH_USER";

interface LogIn {
    type: typeof LOG_USER,
    payload: Credentials
}

interface LogOut {
    type: typeof LOGOUT_USER,
    authenticated: boolean
}

interface SetUserData {
    type: typeof SET_USER_DATA,
    payload: User,
}

interface AuthUser {
    type: typeof AUTH_USER,
    authenticated: boolean
}

export  type UserActionTypes = LogIn | LogOut | SetUserData | AuthUser;
