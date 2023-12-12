import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .max(80, { message: 'Email is too long' }),
  password: z
    .string()
    .min(4, { message: 'Password is too short' })
    .max(16, { message: 'Password is too long' }),
  role: z.enum(['client', 'employee']),
});

const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .max(80, { message: 'Email is too long' }),
  password: z.string(),
});

export const validateUser = (data) => {
  const result = registerSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validatePartialUser = (data) => {
  const result = registerSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};
