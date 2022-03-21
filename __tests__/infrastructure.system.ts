import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk';
import 'jest';

import { UnitOfWork } from '../data-access/repositories/UnitOfWork';
import config from '../cognito-config'

test('Cognito Signup trigger works and user doc is inserted into DB', (done) => {
  const userPool: CognitoUserPool = new CognitoUserPool(config)
  const unitOfWork: UnitOfWork = new UnitOfWork();

  const userData = {
    Username: 'admin10@watchlistapp.com',
    Password: 'Passw0rd!',
  };

  const userAttributes = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: userData.Username,
    }),
    new CognitoUserAttribute({
      Name: 'preferred_username',
      Value: 'Username123',
    })
  ];

  const signUp = new Promise((resolve, reject) => {
    userPool.signUp(userData.Username, userData.Password, userAttributes, null, (err, res) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      }
      resolve(res);
    })
  })
  
  signUp.then(async (user: any) => {
    const userId: string = user.userSub;
    const dbUser = await unitOfWork.Users.GetById(userId)

    await unitOfWork.Users.Delete(userId)

    const cognitoService = new AWS.CognitoIdentityServiceProvider({ region: 'eu-west-1' });
    cognitoService.adminDeleteUser({
      UserPoolId: config.UserPoolId,
      Username: userData.Username
    }).promise().then(() => {
      expect(dbUser.Email).toBe(user.user.username);
      expect(dbUser.ID).toBe(user.userSub)
      expect(200).toBe(200);
    });
    done();
  });
});