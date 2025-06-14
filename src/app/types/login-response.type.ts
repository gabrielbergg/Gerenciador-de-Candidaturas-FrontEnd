import { UserRole } from "./enum-response.type";

export type LoginResponse = {
    userId: number,
    name: string,
    password: string,
    login: string,
    roles: UserRole;
}