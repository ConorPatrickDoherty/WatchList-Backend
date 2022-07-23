import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk';
import 'jest';

import { COGNITO_CONFIG }  from '../../../env/env';
import { UnitOfWork } from '../../../data-access/repositories/UnitOfWork';
import { User } from '../../../interfaces';


test('Cognito Signup trigger works', (done) => {  
  const username = 'admin1@watchlistapp.com'
  
  //get user from Cognito
  const signUpUser = getSignUpPromise(username);

  signUpUser.then(async (user: any) => {
    const userId: string = user.userSub;

    //Get user from db
    const unitOfWork: UnitOfWork = new UnitOfWork();
    const dbUser = await unitOfWork.Users.getById(userId)

    //Delete user from Cognito and the db
    await unitOfWork.Users.delete(userId)

    const deleteUser = getDeleteUserPromise(username);
    deleteUser.then(() => {
      expect(dbUser.email).toBe(user.user.username);
      expect(dbUser.id).toBe(user.userSub)
    });
    done();
  });
});

test('Cognito Confirmation trigger works', (done) => {
  const username = 'admin2@watchlistapp.com'
  
  //get user from Cognito
  const signUpUser = getSignUpPromise(username);
  signUpUser.then(async (user: any) => {
    const userId: string = user.userSub;

    //confirm user in Cognito
    const confirmUser = getConfirmUserPromise(username);
    confirmUser.then(async () => {

      //Get user from db
      const unitOfWork: UnitOfWork = new UnitOfWork();
      const dbUser:User = await unitOfWork.Users.getById(userId)

      //Delete user from Cognito and the db
      await unitOfWork.Users.delete(userId)
  
      const deleteUser = getDeleteUserPromise(username);
      deleteUser.then(() => {
        expect(dbUser.confirmed).toBe(true);
      });
      done();
    });
  });
});

//Helper functions
const getSignUpPromise = (username:string):Promise<any> => {
  const userPool: CognitoUserPool = new CognitoUserPool(COGNITO_CONFIG)

  const userData = {
    Username: username,
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

  return new Promise((resolve, reject) => {
    userPool.signUp(userData.Username, userData.Password, userAttributes, null, 
      (err, res) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        }
        resolve(res);
    })
  })
}

const getDeleteUserPromise = (username: string):Promise<any> => {
  const cognitoService = new AWS.CognitoIdentityServiceProvider({ region: 'eu-west-1' });

  return new Promise((resolve, reject) => {
    cognitoService.adminDeleteUser({ UserPoolId: COGNITO_CONFIG.UserPoolId, Username: username}, 
      (err, res) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        }
        resolve(res);
    })
  }) 
}

const getConfirmUserPromise = (username: string):Promise<any> => {
  const cognitoService = new AWS.CognitoIdentityServiceProvider({ region: 'eu-west-1' });

  return new Promise((resolve, reject) => {
    cognitoService.adminConfirmSignUp({ UserPoolId: COGNITO_CONFIG.UserPoolId, Username: username}, 
      (err, res) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        }
        resolve(res);
    })
  }) 
}