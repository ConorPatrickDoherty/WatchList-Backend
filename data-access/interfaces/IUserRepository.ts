import { CognitoUserAttributes, User, UserBrief } from "../../interfaces";

export interface IUserRepository {
    create(attributes: CognitoUserAttributes);
    getById(userId: string): Promise<User>;
    getUserBrief(userId: string): Promise<UserBrief> 
    delete(userId: string): Promise<User | undefined>;
    update(userId: string, changes: Partial<User>): Promise<User>;
}