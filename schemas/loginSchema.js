import { z } from "zod";
// data validation with zod
const loginSchema = z.object({
    email: z
        .string({
            required_error: "Field 'email' is required",
            invalid_type_error: "Field 'email' must be a string",
        })
        .email({
            invalid_type_error: "This is not a valid email",
        })
        .min(5, "Field 'email'contain at least 3 characters")
        .max(50, "Field 'email' contain to maximum 50 characters ")
        .trim()
        .toLowerCase(),

    password: z
        .string({
            required_error: "Field 'password' is required",
        })
        .regex(
            /(?=.*[a-zA-Z])/,
            "Field 'password' must contain at least one uppercase or lowercase letter",
        )
        .regex(
            /(?=.*[0-9])/,
            "Field 'password' must contain at least one number",
        )
        .regex(/[0-9a-zA-Z@#$%^&+=!]/)

        .min(8, "Field 'password' contain to maximum 50 characters ")
        .max(50, "Field 'password' contain to maximum 50 characters "),
});
export default loginSchema;
