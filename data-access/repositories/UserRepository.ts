import { DataMapper } from '@aws/dynamodb-data-mapper';

import { UserItem } from '../models/UserItem';
import { CognitoUserAttributes, User } from '../../interfaces';

export class UserRepository {

    public constructor(protected db: DataMapper) { 
    }

    public async create(attributes: CognitoUserAttributes): Promise<User> {
        const date: string = new Date().toISOString();

        const user = {
            id: attributes.sub,
            entity: 'user',
            pk: `user#${attributes.sub}`,
            sk: `user#${attributes.sub}`,
            displayName: attributes.preferred_username,
            displayPicture: '',
            email: attributes.email,
            createdAt: date,
            groups: [],
            confirmed: false
        }

        return this.db.put(Object.assign(new UserItem(), user));
    }

    public async getById(userId: string): Promise<UserItem> {
        return this.db.get(Object.assign(new UserItem(), {
			pk: `user#${userId}`,
			sk: `user#${userId}`
		}));
    }

    public async delete(userId: string): Promise<User | undefined> {
		return this.db.delete(Object.assign(new UserItem(), {
			pk: `user#${userId}`,
			sk: `user#${userId}`
		}), {
			returnValues: 'ALL_OLD'
		});
	}

    public async update(userId: string, changes: Partial<User>) {
        return this.db.update(Object.assign(new UserItem(), {
			pk: `user#${userId}`,
			sk: `user#${userId}`,
			...changes
		}), {
			onMissing: 'skip'
		});
    }
}