import { CognitoUserPoolEvent } from 'aws-lambda';
import { CognitoUserAttributes, User } from '../../interfaces';
import { UnitOfWork } from '../../data-access/repositories/UnitOfWork';

export class InfrastructureController {
    public constructor(private unitOfWork: UnitOfWork) {}

    public postSignUp: CognitoUserPoolEvent = async (event: CognitoUserPoolEvent) => {
        const attributes: CognitoUserAttributes = event.request.userAttributes;

        await this.unitOfWork.Users.create(attributes);

        return event;
    }

    postConfirmation: CognitoUserPoolEvent = async (event: CognitoUserPoolEvent) => {
        const  attributes: CognitoUserAttributes = event.request.userAttributes;

        const user: User = await this.unitOfWork.Users.getById(attributes.sub);

        user.confirmed = true;
    }

    public temp: CognitoUserPoolEvent = async (event: CognitoUserPoolEvent)  => {
        const msg: string = "Placeholder function so the infrastructure deploys";

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify(msg)
        }
    }
}