export interface User {
    name: string,
    tel: string,
    username: string,
    password: string,
    admin: boolean
}

export interface LoggedUser {
    name: string,
    admin: boolean
}

export interface Login {
    username: string,
    password: string
}

export interface AuthToken {
    token: string,
    refreshtoken: string,
    message: string
}