import z from "zod";

export const SignupSchema=z.object({
  name:z.string().nonempty({message:'Enter Your Name'}).min(3,{message:'name at least 3 letters'}),
  email: z.string().nonempty({message:'Enter Your email'}).email({message:"Invalid email address"}),
  password: z.string().nonempty({message:'Enter Your password'}).min(6, {message:"Password must be at least 6 characters"}),
})