import { DataMapper } from '@aws/dynamodb-data-mapper';

import { UserItem } from '../models/UserItem';
import { CognitoUserAttributes, User } from '../../interfaces';

export class UserRepository {

    public constructor(protected db: DataMapper) { 
    }

    public async create(attributes: CognitoUserAttributes): Promise<User> {
        const date: string = new Date().toISOString();

        const user = {
            ID: attributes.sub,
            Entity: 'user',
            pk: `user#${attributes.sub}`,
            sk: `user#${attributes.sub}`,
            DisplayName: attributes.preferred_username,
            DisplayPicture: '',
            Email: attributes.email,
            CreatedAt: date,
            Groups: [],
            Confirmed: false
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

    public async update() {
        
    }
}