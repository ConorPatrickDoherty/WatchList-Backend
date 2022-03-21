import { CognitoUserPoolEvent } from 'aws-lambda';
import { CognitoUserAttributes } from '../../interfaces';
import { UnitOfWork } from '../../data-access/repositories/UnitOfWork';

export class InfrastructureController {
    public constructor(private unitOfWork: UnitOfWork) {}

    public postSignUp: CognitoUserPoolEvent = async (event: CognitoUserPoolEvent) => {
        const attributes: CognitoUserAttributes = event.request.userAttributes;

        await this.unitOfWork.Users.create(attributes);

        return event;
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