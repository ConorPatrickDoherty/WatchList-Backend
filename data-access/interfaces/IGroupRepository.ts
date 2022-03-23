import { Group } from "../../interfaces";
import { UserItem } from "../models";

export interface IGroupRepository {
    create(toCreate: Partial<Group>, user: UserItem)
}