export interface CognitoUserAttributes {
    sub: string,
    'cognito:email_alias': string,
    email_verified: boolean,
    'cognito:user_status': string,
    preferred_username: string,
    email: string
}