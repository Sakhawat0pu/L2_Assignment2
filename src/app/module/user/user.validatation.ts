import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const addressValidationSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const orderValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string().trim(),
  fullName: nameValidationSchema.required(),
  age: z.number(),
  email: z.string().email().trim(),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean',
  }),
  hobbies: z.array(z.string()),
  address: addressValidationSchema.required(),
  orders: z.array(orderValidationSchema),
});

export default userValidationSchema;
