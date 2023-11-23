import { Schema, model } from 'mongoose';
import validator from 'validator';
import { Address, Name, Order, User } from './user.interface';

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    validate: {
      validator: (fName: string) => validator.isAlpha(fName),
      message: '{VALUE} is not in valid format',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    validate: {
      validator: (lName: string) => validator.isAlpha(lName),
      message: '{VALUE} is not in valid format',
    },
  },
});

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    trim: true,
    required: [true, 'Street name is required'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City name is required'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Street field is required'],
  },
});

const orderSchema = new Schema<Order>({
  productName: {
    type: String,
    trim: true,
    required: [true, 'Product name is required.'],
  },
  price: { type: Number, required: [true, 'Product price is required.'] },
  quantity: { type: Number, required: [true, 'Product quantity is required'] },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'A unique user ID is required.'],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'A unique username is required.'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'A password is required.'],
  },
  fullName: { type: nameSchema, required: true },
  age: { type: Number, required: [true, 'Age is required.'] },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required.'],
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: '{VALUE} is not an email address.',
    },
  },
  isActive: {
    type: Boolean,
    required: [true, 'Please indicate if the user is active or inactive'],
  },
  hobbies: { type: [String], required: [true, 'Hobby is required'] },
  address: { type: addressSchema, required: [true, 'Address is required.'] },
  orders: { type: [orderSchema], default: [] },
  isDeleted: { type: Boolean, default: false },
});
