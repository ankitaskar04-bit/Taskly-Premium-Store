 import { z } from "zod";

export const checkoutSchema = z.object({
  // Name Validation
  name: z
    .string()
    .min(1, { message: "Full name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),

  // Area/Address Validation
  area: z
    .string()
    .min(1, { message: "Address/Area is required" })
    .min(10, { message: "Please provide a detailed address (min 10 chars)" }),

  // Phone Validation
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[6-9]\d{9}$/, { 
      message: "Please enter a valid 10-digit Indian phone number" 
    }),

  // City Validation
  city: z
    .string()
    .min(1, { message: "City name is required" })
    .min(2, { message: "Invalid city name" }),

  // Pincode Validation
  pincode: z
    .string()
    .min(1, { message: "Pincode is required" })
    .length(6, { message: "Pincode must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Pincode must contain only numbers" }),
});