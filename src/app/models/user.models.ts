export interface User{
    _id?: string,
    email: string,
    senha: string,
    __v?: number
  }

export interface UserApiResponse{
  user: User[]
}