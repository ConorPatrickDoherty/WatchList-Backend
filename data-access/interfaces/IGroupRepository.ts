import { Group, UserBrief } from "../../interfaces";

export interface IGroupRepository {
    getByCode(code: string): Promise<Group>
    create(toCreate: Partial<Group>, user: UserBrief): Promise<Group>
    update(code: string, userId: string, changes: Partial<Group>): Promise<Group>
}