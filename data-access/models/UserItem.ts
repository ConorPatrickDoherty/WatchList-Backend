import { DynamoDbItem } from './DbItem';
import { attribute } from '@aws/dynamodb-data-mapper-annotations';
import { User, UserGroup } from '../../interfaces';

export class UserItem extends DynamoDbItem implements User {
    @attribute()
    public id: string;

    @attribute()
    public displayName: string;

    @attribute()
    public displayPicture: string;

    @attribute()
    public email: string;

    @attribute()
    public createdAt: string;

    @attribute()
    public groups: UserGroup[];

    @attribute()
    public confirmed: boolean;
}