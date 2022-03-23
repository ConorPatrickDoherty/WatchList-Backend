import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Group, GroupUser } from '../../interfaces';
import { GroupItem, UserItem } from '../models';
import { v4 as uuid } from 'uuid';

export class GroupRepository {
    public constructor(protected db: DataMapper) { }

    public async create(toCreate: Partial<Group>, user: UserItem): Promise<Group> {
        const id: string = uuid();
        const date: string = new Date().toISOString();
        const sk: string = "user#" + toCreate.users.filter(x => x.admin).reduce((prev, current) => (prev.joinedAt > current.joinedAt) ? prev : current).id;
        
        const groupAdmin: GroupUser = {
            admin: true,
            verified: true,
            joinedAt: date,
            ...user
        }

        return this.db.put(Object.assign(new GroupItem, {
            id,
            entity: 'group',
            pk: `group#${id}`,
            sk,
            createdAt: date,
            movies: [],
            notifications: [],
            users: [groupAdmin],
            ...toCreate
        }));
    }
}