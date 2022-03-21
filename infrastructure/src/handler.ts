import { InfrastructureController } from "./infrastructure.controller";
import { CognitoUserPoolEvent } from 'aws-lambda';
import { UnitOfWork } from "../../data-access/repositories/UnitOfWork";

const userRepo = new UnitOfWork();
const controller = new InfrastructureController(userRepo);

export const postSignUp: CognitoUserPoolEvent = controller.postSignUp;

export const temp = controller.temp;