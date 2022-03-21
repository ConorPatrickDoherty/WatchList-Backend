export interface CognitoUserAttributes {
    sub: String,
    'cognito:email_alias': String,
    email_verified: Boolean,
    'cognito:user_status': String,
    preferred_username: String,
    email: String
}