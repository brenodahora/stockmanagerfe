export interface Product {
  _id?: string;
  title: string;
  description: string;
  department: string;
  brand: string;
  price: number;
  qtd_stock: number;
  bar_codes: string;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}

export interface User{
  _id?: string;
  name: string;
  email: string;
}

export interface ProductApiResponse {
  products: Product[];
  totalDocs: number;
  limit: number;
  total: number;
  page: number;
}

export interface UserApiResponse{
  users: User[];
}
