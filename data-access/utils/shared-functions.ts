import { USERID_FOR_TESTING } from "../../env/env";

export class SharedFunctions {

	public static getUserIdFromAuthProvider = (authProvider: string): string => {
		if (process.env.ENVIRONMENT === 'dev' && process.env.IS_OFFLINE) return USERID_FOR_TESTING;
		if (!process.env.IS_OFFLINE && !authProvider) throw Error('No Auth Provider');

		const parts: string[] = authProvider.split(':');
		const userId: string = process.env.IS_OFFLINE ? USERID_FOR_TESTING : parts[parts.length - 1];

		if (!userId) throw Error('Unauthorised action');
		return userId;
	}
}