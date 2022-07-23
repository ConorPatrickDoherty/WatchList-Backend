import { ApiHandler, ApiResponse, ErrorCode, ResponseBuilder } from '../../../data-access';
import { APIGatewayEvent } from 'aws-lambda';
import { UnitOfWork } from '../../../data-access/repositories';

export class ChatroomController {
    public constructor(private unitOfWork: UnitOfWork) {}

    public getChatroom:  ApiHandler = async (event: APIGatewayEvent): Promise<ApiResponse> => { 
        if (!event.pathParameters || !event.pathParameters.chatroomId) {
			return ResponseBuilder.badRequest(ErrorCode.BadRequest, 'Invalid request parameters');
		}

        const chatroomId = event.pathParameters.chatroomId;

        try {

        } catch (err) {
            
        }
    }
}