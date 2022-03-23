export interface Group {
    id: string;
    name: string;
    code: string;
    createdAt: string;
    users: GroupUser[];
    movies: GroupMovie[];
    notifications: GroupNotification[];
}

export interface GroupUser {
    id: string;
    admin: boolean;
    displayName: string;
    displayPicture: string; 
    verified: boolean;
    joinedAt: string;
}

export interface GroupMovie {
    id: string;
    name: string;
    createdAt: string;
    seen: boolean;
    added: string;
}

export interface GroupNotification {
    thumbnail: string;
    body: string;
    icon: string;
    createdAt: string;
    link: string;
}