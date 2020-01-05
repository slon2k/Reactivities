export interface IUser {
    userName: string,
    displayName: string,
    token: string,
    image?: string
}

export interface IUserForm {   
    email: string,
    password: string,
    userName?: string,
    displayName?: string
}