import { z } from "zod";

export const RequestBodyRegister = z.object({
  email: z.string().trim().min(1),
});
export const RequestBodyLogin = z.object({
  email: z.string().trim().min(1),
  password: z.string().trim().min(1),
});
export const RequestBodyVerifyEmail = z.object({
  key: z.string().trim().min(1),
});
export const RequestBodyVerifyUser = z.object({
  key: z.string().trim().min(1),
  displayName: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

export const PreUserJWT = z.object({
  id: z.number(),
  email: z.string().trim().min(1),
  randomKey: z.string().trim().min(1),
});

export type TypeRequestBodyRegister = z.infer<typeof RequestBodyRegister>;
export type TypeRequestBodyLogin = z.infer<typeof RequestBodyLogin>;
export type TypeRequestBodyVerifyEmail = z.infer<typeof RequestBodyVerifyEmail>;
export type TypeRequestBodyVerifyUser = z.infer<typeof RequestBodyVerifyUser>;

export type TypePreUserJWT = z.infer<typeof PreUserJWT>;
