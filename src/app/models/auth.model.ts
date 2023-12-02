export interface Auth {
    user: {
        _id: string,
        email: string,
        senha: string,
        name: string,
        __v: number
    },
    token: string
}

export interface AuthValidateToken {
    authenticate?: string
}