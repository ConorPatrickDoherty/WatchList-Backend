import { UnitOfWork } from '../../../data-access/repositories';
import { APIGatewayEvent } from 'aws-lambda';
import { ApiHandler, ApiResponse, ErrorCode } from '../../../data-access/types';
import { ResponseBuilder, SharedFunctions } from '../../../data-access/utils';
import { UserItem } from '../../../data-access';
import { Group } from '../../../interfaces';

export class GroupController {
    public constructor(private unitOfWork: UnitOfWork) {}

    public createGroup: ApiHandler = async (event: APIGatewayEvent): Promise<ApiResponse> => {
		if (!event.body) {
			return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Invalid request parameters');
		}

        const group: Partial<Group> = JSON.parse(event.body);
        const userId: string = SharedFunctions.getUserIdFromAuthProvider(event.requestContext.identity.cognitoAuthenticationProvider);
        const user: UserItem = await this.unitOfWork.Users.getById(userId);
        
        await this.unitOfWork.Groups.create(group, user);
    }
}