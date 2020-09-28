import { UserState } from './reducer';
export const isAuthorised = (state: UserState) => state.user.authenticated;
