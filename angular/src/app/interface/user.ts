export interface User {
    name: string,
    tel: string,
    username: string,
    password: string,
    admin: boolean
}

export interface Login {
    username: string,
    password: string
}

export interface login {
    "auth-token": string,
    message: string
}