import z from "zod";

export const LoginSchema=z.object({
   email: z.string().nonempty({message:'Enter Your email'}).email({message:"Invalid email address"}),
  password: z.string().nonempty({message:'Enter Your password'}).min(6, {message:"Password must be at least 6 characters"}),
})