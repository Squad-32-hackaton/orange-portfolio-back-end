import { z } from "zod";
// data validation with zod
const userSchema = z.object({
    first_name: z
        .string({
            required_error: "Field 'name' is required",
            invalid_type_error: "Field 'name' must be a string",
        })
        .min(3, "Field 'name' contain at least 3 characters ")
        .max(50, "Field 'name' contain to maximum 50 characters ")
        .trim()
        .regex(
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i,
            "Field 'name' is invalid",
        ),

    last_name: z
        .string({
            required_error: "Field 'last_name' is required",
            invalid_type_error: "Field 'last_name' must be a string",
        })
        .min(3, "Field 'last_name'contain at least 3 characters")
        .max(50, "Field 'last_name' contain to maximum 50 characters ")
        .trim()
        .regex(
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i,
            "Field 'last_name' is invalid",
        ),

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
        .min(8, "Field 'password' contain to minimun 8 characters ")
        .max(50, "Field 'password' contain to maximum 50 characters "),

    avatar_id: z
        .number({
            invalid_type_error: "Field 'avatar' must be a number",
        })
        .optional(),
});
export default userSchema;
