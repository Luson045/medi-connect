const { z } = require("zod");

const passwordSchema = z
  .string()
  .min(8, "Password should be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

const userSchema = z.object({
  type: z.enum(["user", "hospital"]),
  name: z.string().min(3, "Name should be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
  phone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
  }),
  gender: z
    .string()
    .transform(
      (val) => `${val.charAt(0).toUpperCase()}${val.slice(1).toLowerCase()}`
    ),
  dob: z
    .union([z.date(), z.string().transform((val) => new Date(val))])
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid date format" }),
  medicalHistory: z.array(z.string()).optional(),
});

const hospitalSchema = z.object({
  type: z.enum(["user", "hospital"]),
  name: z.string().min(3, "Name should be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
  phone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
  }),
  website: z.string().optional(),
  department: z.string(),
  availableServices: z.array(z.string()).optional(),
});

const loginSchema = z.object({
  type: z.enum(["user", "hospital"]),
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
});

const emailCheckSchema = z.object({
  type: z.enum(["user", "hospital"]),
  email: z.string().email("Invalid email format"),
});

const otpVerificationSchema = z.object({
  email: z.string().email("Invalid email format"),
  otp: z.string(), // The OTP is expected to be a string
});

const passwordResetSchema = z.object({
  type: z.enum(["user", "hospital"]),
  email: z.string().email("Invalid email format"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"), // Adjust the criteria as needed
});

module.exports = {
  userSchema,
  hospitalSchema,
  loginSchema,
  emailCheckSchema,
  otpVerificationSchema,
  passwordResetSchema,
};
