import { DynamoDbItem } from './DbItem';
import { attribute } from '@aws/dynamodb-data-mapper-annotations';
import { User, UserGroup } from '../../interfaces';

export class UserItem extends DynamoDbItem implements User {
    @attribute()
    public ID: String;

    @attribute()
    public DisplayName: String;

    @attribute()
    public DisplayPicture: String;

    @attribute()
    public Email: String;

    @attribute()
    public CreatedAt: String;

    @attribute()
    public Groups: UserGroup[];

    @attribute()
    public Confirmed: Boolean;
}