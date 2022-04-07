import { UnitOfWork } from '../../../data-access/repositories';
import { APIGatewayEvent } from 'aws-lambda';
import { ApiHandler, ApiResponse, ErrorCode } from '../../../data-access/types';
import { ResponseBuilder, SharedFunctions } from '../../../data-access/utils';
import { Group, GroupUser, UserBrief } from '../../../interfaces';

export class GroupController {
    public constructor(private unitOfWork: UnitOfWork) {}

    public getGroup: ApiHandler = async (event: APIGatewayEvent): Promise<ApiResponse> => {
		if (!event.pathParameters || !event.pathParameters.code) {
			return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Invalid request parameters');
		}

        const code: string = event.pathParameters.code;

        try {
            const res =  await this.unitOfWork.Groups.getByCode(code)
            if (!res) {
                return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Failed to create Group');
            }

            return ResponseBuilder.ok({group: res});
        } catch (err) {
            return ResponseBuilder.internalServerError(err, err.message);
        }        
    }

    public createGroup: ApiHandler = async (event: APIGatewayEvent): Promise<ApiResponse> => {
		if (!event.body) {
			return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Invalid request parameters');
		}

        const group: Partial<Group> = JSON.parse(event.body);
        const userId: string = SharedFunctions.getUserIdFromAuthProvider(event.requestContext.identity.cognitoAuthenticationProvider);
        const existingGroup = await this.unitOfWork.Groups.getByCode(group.code);

        if (existingGroup) {
            return ResponseBuilder.badRequest(ErrorCode.GeneralError, 'A group with this code already exists');
        }

        const user: UserBrief = await this.unitOfWork.Users.getUserBrief(userId);
        
        try {
            const res =  await this.unitOfWork.Groups.create(group, user);
            if (!res) {
                return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Failed to create Group');
            }

            return ResponseBuilder.ok({group: res});
        } catch (err) {
            return ResponseBuilder.internalServerError(err, err.message);
        }
    }

    public addUserWithCode: ApiHandler = async (event: APIGatewayEvent): Promise<ApiResponse> => {
		if (!event.pathParameters || !event.pathParameters.code) {
			return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Invalid request parameters');
		}

        const code:string = event.pathParameters.code;
        const userId: string = SharedFunctions.getUserIdFromAuthProvider(event.requestContext.identity.cognitoAuthenticationProvider);
        const user: UserBrief = await this.unitOfWork.Users.getUserBrief(userId);

        const group: Group = await this.unitOfWork.Groups.getByCode(code);
        const date: string = new Date().toISOString();
        
        if (group.users.find(x => x.id === userId)) {
            return ResponseBuilder.badRequest(ErrorCode.GeneralError, 'You are already in this Group');
        }


        const groupUser: GroupUser = {
            admin: true,
            verified: true,
            joinedAt: date,
            ...user
        }
        
        group.users.push(groupUser);

        try {
            const res = this.unitOfWork.Groups.update(code, userId, group)
            if (!res) {
                return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Failed to join Group');
            }

            return ResponseBuilder.ok({ group });
        } catch (err) {
            return ResponseBuilder.internalServerError(err, err.message);
        }
    }

    // TODO add invite functionality
    // public inviteUserToGroup: ApiHandler= async (event: APIGatewayEvent): Promise<ApiResponse> => { 

    // }
}