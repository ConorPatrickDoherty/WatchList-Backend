import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('WatchListApp-Table-dev')
export class DynamoDbItem implements DynamoDbItem {
	@hashKey()
	public pk!: string;

	@rangeKey()
	public sk!: string;

	@attribute()
	public entity!: string;
}

export interface DynamoDbItem {
	pk: string;
	sk: string;
	entity: string;
}