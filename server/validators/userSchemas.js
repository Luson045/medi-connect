const { z } = require("zod");

const userSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});

const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name should be at least 3 characters long")
    .optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long")
    .optional(),
});

module.exports = { userSchema, updateUserSchema };
