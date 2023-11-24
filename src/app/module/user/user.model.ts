import { Schema, UpdateQuery, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TAddress, TName, TOrder, TUser, TUserModel } from './user.interface';

// Create a Schema for a user's name
const nameSchema = new Schema<TName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true,
      validate: {
        validator: (fName: string) => validator.isAlpha(fName), // using validator, check if name is in correct format
        message: '{VALUE} is not in valid format',
      },
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true,
      validate: {
        validator: (lName: string) => validator.isAlpha(lName), // using validator, check if name is in correct format
        message: '{VALUE} is not in valid format',
      },
    },
  },
  { _id: false }, // don't create _id for sub-document
);

// Create a Schema for an address
const addressSchema = new Schema<TAddress>(
  {
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
  },
  { _id: false }, // don't create _id for sub-document
);

// Create a Schema for an order
const orderSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, 'Product name is required.'],
    },
    price: { type: Number, required: [true, 'Product price is required.'] },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
  },
  { _id: false }, // don't create _id for sub-document
);

// Create a Schema for a user
const userSchema = new Schema<TUser, TUserModel>({
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
  address: {
    type: addressSchema,
    required: [true, 'Address is required.'],
  },
  orders: {
    type: [orderSchema],
    default: undefined,
  },
});

// Middleware: Hash the user's password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Middleware: Hash the user's password before updating
userSchema.pre('findOneAndUpdate', async function (next) {
  // ! to refer update is not null and UpdateQuery<TUser> asserts the type of update
  const update = this.getUpdate()! as UpdateQuery<TUser>;
  // Check if password field is present in the document to be updated
  if (update.$set?.password) {
    update.$set.password = await bcrypt.hash(
      update.$set.password,
      Number(config.bcrypt_salt_round),
    );
  }
  next();
});

// Middleware: Remove sensitive information from the toJSON output
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Middleware: Define a projection for find queries
userSchema.pre('find', function (next) {
  this.find().projection({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  next();
});

// Static Method: Get a user by userId
userSchema.statics.getUser = async (userId: number) => {
  return await userModel.findOne({ userId });
};

/// Create the user model using the schema
export const userModel = model<TUser, TUserModel>('Users', userSchema);
