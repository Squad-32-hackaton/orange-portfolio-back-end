import { z } from "zod";
//validação dos dados com ZOD
const loginSchema = z.object({
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
});
export default loginSchema;
