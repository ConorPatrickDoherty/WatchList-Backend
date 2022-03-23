import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { IGroupRepository, IUserRepository } from "../interfaces";
import { GroupRepository } from "./GroupRepository";
import { UserRepository } from "./UserRepository";

export class UnitOfWork {
    public Users:IUserRepository;
    public Groups: IGroupRepository;

    public constructor() {
        const db: DataMapper= new DataMapper({ client: new DynamoDB({ region: 'eu-west-1' }) });
        
        this.Users = new UserRepository(db);
        this.Groups = new GroupRepository(db);
    }
}