import { APIGatewayEvent, Context, ProxyCallback, ProxyResult } from 'aws-lambda';

export type ApiResponse = ProxyResult;
export type ApiHandler = (event: APIGatewayEvent, context: Context, callback: ProxyCallback) => void;