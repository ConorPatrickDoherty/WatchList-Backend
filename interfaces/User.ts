export interface User {
    ID: String;
    DisplayName: String;
    DisplayPicture: String;
    Email: String;
    CreatedAt: String;
    Groups: UserGroup[];
    Confirmed: Boolean;
}

export interface UserGroup {
    ID: String;
    Name: String;
    Code: String;
    Joined: Boolean;
    InvitedBy: UserInvite;
}

export interface UserInvite {
    ID: String;
    DisplayName: String;
    InvitedAt: Date;
}