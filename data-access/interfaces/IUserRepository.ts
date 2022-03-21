import { CognitoUserAttributes } from "../../interfaces";
import { UserItem } from "../models/UserItem";

export interface IUserRepository {
    create(attributes: CognitoUserAttributes);
    getById(userId: string): Promise<UserItem>;
    delete(userId: string)
}