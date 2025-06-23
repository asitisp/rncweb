import {z} from 'zod';

export const usernameValidation = z
  .string()
  .min(3,"minimum 3 characters")
  .max(20,"maximum 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "only alphanumeric characters and underscores are allowed")

export const emailValidation = z
  .string()
  .email();

export const passwordValidation = z
  .string()
  .min(6,"minimum 6 characters")
  .max(15,"maximum 15 characters");


export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: passwordValidation
});

  