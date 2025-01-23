import { UserRole } from "./enum-response.type";

export type LoginResponse = {
    password: string,
    login: string,
    roles: UserRole;
}