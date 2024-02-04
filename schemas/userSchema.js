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
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, "Field 'name' is invalid"),

    last_name: z
        .string({
            required_error: "Field 'last_name' is required",
            invalid_type_error: "Field 'last_name' must be a string",
        })
        .min(3, "Field 'last_name'contain at least 3 characters")
        .max(50, "Field 'last_name' contain to maximum 50 characters ")
        .trim()
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, "Field 'last_name' is invalid"),

    email: z
        .string({
            required_error: "Field 'email' is required",
            invalid_type_error: "Field 'email' must be a string",
        })
        .email({
            invalid_type_error: "This is not a valid email",
        })
        .min(5, "Field 'email' contain at least 3 characters")
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

        .min(8, "Field 'password' contain to minimun 8 characters ")
        .max(50, "Field 'password' contain to maximum 50 characters "),

    avatar_id: z
        .number({
            invalid_type_error: "Field 'avatar' must be a number",
        })
        .optional(),
});
export default userSchema;
