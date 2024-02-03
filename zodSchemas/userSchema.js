import { z } from "zod";
//validação dos dados com ZOD
const userSchema = z.object({
    first_name: z
        .string({
            required_error: "Field 'name' is required",
            invalid_type_error: "Field 'name' must be a string",
        })
        .min(3, "Field 'name' contain at least 3 characters ")
        .max(50, "Field 'name' contain to maximum 50 characters ")
        .trim(),

    last_name: z
        .string({
            required_error: "Field 'last_name' is required",
            invalid_type_error: "Field 'last_name' must be a string",
        })
        .min(3, "Field 'last_name'contain at least 3 characters")
        .max(50, "Field 'name' contain to maximum 50 characters ")
        .trim(),

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
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
            "Field 'password' must contain at least one digit at least one lowercase letter at least uppercase letter must contain at least one capital letter at least one special character at least 8 of the characters",
        )
        .max(50, "Field 'name' contain to maximum 50 characters ")
        .trim(),

    avatar_id: z
        .number({
            invalid_type_error: "Field 'avatar' must be a number",
        })
        .optional(),
});
export default userSchema;
