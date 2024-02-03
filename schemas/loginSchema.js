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
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/,
            "Field 'password' must contain at least one digit at least one lowercase letter at least uppercase letter must contain at least one capital",
        )
        .min(8, "Field 'password' contain to maximum 50 characters ")
        .max(50, "Field 'password' contain to maximum 50 characters "),
});
export default loginSchema;
