export interface ChatRoom {
    ID: String;
    Name: String;
    CreatedAt: Date;
    Group: ChatRoomGroup;
    Users: ChatRoomUser;
    Messages: ChatRoomMessage;
}

export interface ChatRoomGroup {
    ID: String;
    Name: String;
}

export interface ChatRoomUser {
    ID: String;
    DisplayName: String;
    DisplayPicture: String;
}

export interface ChatRoomMessage {
    UserID?: String;
    Thumbnail?: String;
    Body: String;
    SentAt: String;
    MessageType: String;
}