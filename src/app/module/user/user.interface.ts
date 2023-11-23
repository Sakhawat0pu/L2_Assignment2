import { Model } from 'mongoose';

export type TName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

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
  orders?: Array<TOrder>;
};

export interface TUserModel extends Model<TUser> {
  getUser(userId: number): Promise<TUser | null>;
}
