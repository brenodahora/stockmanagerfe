export interface Auth {
    user: {
        _id: string,
        email: string,
        senha: string,
        __v?: number
    },
    token: string
}