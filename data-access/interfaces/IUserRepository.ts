import { CognitoUserAttributes } from "../../interfaces";
import { UserItem } from "../models/UserItem";

export interface IUserRepository {
    Create(attributes: CognitoUserAttributes);
    GetById(userId: string): Promise<UserItem>;
    Delete(userId: string)
}