import { User } from '../Auth'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'

const USER_LOAD_SUCCESS = 'USER_LOAD_SUCCESS'
const USER_LOAD_FAIL = 'USER_LOAD_FAIL'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'

const LOG_OUT = 'LOG_OUT'

export interface RegisterSuccessAction {
   type: typeof REGISTER_SUCCESS
   token: string
}
export interface RegisterFailAction {
   type: typeof REGISTER_FAIL
}
export interface UserLoadSuccessAction {
   type: typeof USER_LOAD_SUCCESS
   user: User
}
export interface UserLoadFailAction {
   type: typeof USER_LOAD_FAIL
}
export interface LoginSuccessAction {
   type: typeof LOGIN_SUCCESS
   token: string
}
export interface LoginFailAction {
   type: typeof LOGIN_FAIL
}
export interface LogOutAction {
   type: typeof LOG_OUT
}

export type AuthActionTypes =
   | RegisterSuccessAction
   | RegisterFailAction
   | UserLoadSuccessAction
   | UserLoadFailAction
   | LoginFailAction
   | LoginSuccessAction
   | LogOutAction
