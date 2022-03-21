export interface Group {
    ID: String;
    Name: String;
    Code: String;
    CreatedAt: Date;
    Users: GroupUser[];
    Movies: GroupMovie[];
    Notifications: GroupNotification[];
}

export interface GroupUser {
    ID: String;
    DisplayName: String;
    DisplayPicture: String;
    Verified: Boolean;
    JoinedAt: Date;
}

export interface GroupMovie {
    ID: String;
    Name: String;
    CreatedAt: Date;
    Seen: Boolean;
    Added: Date;
}

export interface GroupNotification {
    Thumbnail: String;
    Body: String;
    Icon: String;
    CreatedAt: Date;
    Link: String;
}