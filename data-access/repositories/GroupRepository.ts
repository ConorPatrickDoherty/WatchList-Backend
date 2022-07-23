import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Group, GroupUser, UserBrief } from '../../interfaces';
import { GroupItem } from '../models';
import { v4 as uuid } from 'uuid';
// import { QueryKey } from '../interfaces';

export class GroupRepository {
    public constructor(protected db: DataMapper) { }

    public async getByCode(code: string): Promise<Group> {
        try {
            const pk = `code#${code}`;
            const sk = pk; 
            const item: Group = await this.db.get(Object.assign(new GroupItem(), { pk, sk }));
            
            return item;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    public async create(toCreate: Partial<Group>, user: UserBrief): Promise<Group> {
        const id: string = uuid();
        const date: string = new Date().toISOString();

        const groupAdmin: GroupUser = {
            admin: false,
            verified: false,
            joinedAt: date,
            ...user
        }

        //TODO 
        //Consider making PK the ID, keeping the SK as the Code, and using a GSI to get groups just by code
        return this.db.put(Object.assign(new GroupItem, {
            id,
            entity: 'group',
            pk: `code#${toCreate.code}`,
            sk: `code#${toCreate.code}`,
            createdAt: date,
            movies: [],
            notifications: [],
            users: [groupAdmin],
            ...toCreate
        }));
    }
    
    public async update(code: string, userId: string, changes: Partial<Group>): Promise<Group> {
        return this.db.update(Object.assign(new GroupItem(), {
			pk: `code#${code}`,
			sk: `user#${userId}`,
			...changes
		}), {
			onMissing: 'skip'
		});
    }
}