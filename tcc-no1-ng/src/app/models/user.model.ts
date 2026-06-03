export interface User{
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  birthdate: Date;
  isActive: boolean;
}

export interface UserResponse {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  birthdate: Date;
  age: number;
  isActive: boolean;
}

export interface UserRequest {
  firstname: string;
  lastname: string;
  address: string;
  birthdate: string;
  isActive: boolean;
}
