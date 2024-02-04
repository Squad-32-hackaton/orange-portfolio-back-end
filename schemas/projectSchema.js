import { z } from "zod";

export const createAndUpdate = z.object({
    title: z
        .string({
            required_error: "O campo 'title' é obrigatório",
            invalid_type_error: "O campo 'title'deve ser do tipo texto",
        })
        .trim()
        .min(3, "O campo 'title' deve conter no mínimo 3 caracteres")
        .max(100, "O campo 'title' deve conter no máximo 100 caracteres"),
    description: z
        .string({
            required_error: "O campo 'description' é obrigatório",
            invalid_type_error: "O campo 'description' deve ser do tipo texto",
        })
        .trim()
        .min(3, "O campo 'description' deve conter no mínimo 3 caracteres")
        .max(191, "O campo 'description' deve conter no máximo 191 caracteres"),
    link: z
        .string({
            required_error: "O campo 'link' é obrigatório",
            invalid_type_error: "O campo 'link' deve ser do tipo texto",
        })
        .trim()
        .min(3, "O campo 'link' should deve conter no mínimo 3 caracteres")
        .max(191, "O campo 'link' deve conter no máximo 191 caracteres"),
    tags: z
        .string({
            required_error: "O campo 'tags' é obrigatório",
            invalid_type_error: "O campo 'tags' deve ser um vetor de textos",
        })
        .trim()
        .min(2, "Cada tag deve conter no mínimo 2 caracteres")
        .max(50, "Cada tag deve conter no máximo 50 caracteres")
        .array(),
    image_id: z.number({
        required_error: "O campo 'image_id' é obrigatório",
        invalid_type_error: "O campo 'image_id' deve ser um número",
    }),
});

export const getAll = z.object({
    user_id: z
        .number({
            invalid_type_error: "O parâmetro 'user_id' deve ser um número",
        })
        .nullable(),
});

export const getById = z.object({
    project_id: z.number({
        required_error: "O parâmetro 'project_id' é obrigatório",
        invalid_type_error: "O parâmetro 'project_id' deve ser um número",
    }),
});

export const getByTag = z.object({
    user_id: z
        .number({
            invalid_type_error: "O parâmetro 'user_id' deve ser um número",
        })
        .nullable(),
    tag: z.string({
        required_error: "A query string 'tag' é obrigatória",
    }),
});

export const getByUserIdAndId = z.object({
    user_id: z.number({
        required_error: "O parâmetro 'user_id' é obrigatório",
        invalid_type_error: "O parâmetro 'user_id' deve ser um número",
    }),
    project_id: z.number({
        required_error: "O parâmetro 'project_id' é obrigatório",
        invalid_type_error: "O parâmetro 'project_id' deve ser um número",
    }),
});
