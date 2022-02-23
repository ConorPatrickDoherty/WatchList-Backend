import {  CognitoUserPoolEvent } from 'aws-lambda';

export class InfrastructureController {
    public constructor() {}

    public postSignUp: CognitoUserPoolEvent = async (event: CognitoUserPoolEvent) => {
        const msg: string = "Placeholder function so the infrastructure deploys";
        
        console.log(msg);

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify(msg)
        }
    }
}