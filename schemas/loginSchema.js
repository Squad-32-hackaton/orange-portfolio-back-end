import { z } from "zod";
// data validation with zod
const loginSchema = z.object({
    email: z
        .string({
            required_error: "O campo 'email' é obrigatório.",
            invalid_type_error: "O campo 'email' deve ser um texto.",
        })
        .email({
            invalid_type_error: "Este não é um 'email' válido",
        })
        .max(50, "O campo 'email' deve conter no máximo 50 caracteres.")
        .trim()
        .toLowerCase(),

    password: z
        .string({
            required_error: "O campo 'senha' é obrigatório.",
        })
        .regex(
            /(?=.*[a-zA-Z])/,
            "O campo 'senha' deve conter pelo menos uma letra",
        )
        .regex(
            /(?=.*[0-9])/,
            "O campo 'senha' deve conter pelo menos um número",
        )
        .regex(/[0-9a-zA-Z@#$%^&+=!]/)

        .min(8, "O campo 'senha' deve conter pelo menos 8 dígitos")
        .max(50, "O campo 'senha' deve conter no máximo 50 dígitos"),
});
export default loginSchema;
