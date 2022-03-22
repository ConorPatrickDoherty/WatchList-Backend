import { CognitoUserAttributes, User } from "../../interfaces";
import { UserItem } from "../models/UserItem";

export interface IUserRepository {
    create(attributes: CognitoUserAttributes);
    getById(userId: string): Promise<UserItem>;
    delete(userId: string): Promise<User | undefined>;
    update(userId: string, changes: Partial<User>): Promise<User>;
}