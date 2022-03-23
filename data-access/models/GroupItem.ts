import { attribute } from '@aws/dynamodb-data-mapper-annotations';
import { Group, GroupMovie, GroupNotification, GroupUser } from '../../interfaces';
import { DynamoDbItem } from './DbItem';

export class GroupItem extends DynamoDbItem implements Group {
    @attribute()
    public id: string;

    @attribute()
    public name: string;

    @attribute()
    public code: string;

    @attribute()
    public createdAt: string;

    @attribute()
    public users: GroupUser[];

    @attribute()
    public movies: GroupMovie[];

    @attribute()
    public notifications: GroupNotification[];
}