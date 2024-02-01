import { z } from "zod";
//validação dos dados com ZOD
const userSchema = z.object({
    first_name: z
        .string({
            required_error: "Field 'first_name' is required",
            invalid_type_error: "Field 'name' must be a string",
        })
        .max(50),
    last_name: z
        .string({
            required_error: "Field 'last_name' is required",
            invalid_type_error: "Field 'last_name' must be a string",
        })
        .max(50),
    email: z
        .string({
            required_error: "Field 'email' is required",
            invalid_type_error: "Field 'email' must be a string",
        })
        .email({
            invalid_type_error: "This is not a valid email",
        })
        .max(50),
    password: z.string({
        required_error: "Field 'password' is required",
        invalid_type_error: "Field 'password' must be a string",
    }),
    avatar_id: z.number().optional(),
});
export default userSchema;
