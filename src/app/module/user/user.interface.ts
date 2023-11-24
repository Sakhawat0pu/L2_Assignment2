import { Model } from 'mongoose';

// Defining a type for a user's name
export type TName = {
  firstName: string;
  lastName: string;
};

// Defining a type for an address
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

// Defining a type for an order
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

// Defining a type for a user
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
  orders?: Array<TOrder>; // Optional field for an array of orders
};

// Defining an interface that extends the Model interface for a User
export interface TUserModel extends Model<TUser> {
  getUser(userId: number): Promise<TUser | null>; // Custom static method to get a user by userId
}
