export interface User {
    id: string;
    displayName: string;
    displayPicture: string;
    email: string;
    createdAt: string;
    groups: UserGroup[];
    confirmed: boolean;
}

export interface UserGroup {
    id: string;
    name: string;
    code: string;
    joined: boolean;
    invitedBy: UserInvite;
}

export interface UserInvite {
    id: string;
    displayName: string;
    invitedAt: string;
}