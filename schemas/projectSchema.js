import { z } from "zod";

export const createAndUpdate = z.object({
    title: z
        .string({
            required_error: "Field 'title' is required",
            invalid_type_error: "Field 'title' must be a string",
        })
        .trim()
        .min(3, "Field 'title' should contain at least 3 characters")
        .max(100, "Field 'title' should contain a maximum of 100 characters"),
    description: z
        .string({
            required_error: "Field 'description' is required",
            invalid_type_error: "Field 'description' must be a string",
        })
        .trim()
        .min(3, "Field 'description' should contain at least 3 characters")
        .max(
            191,
            "Field 'description' should contain a maximum of 191 characters",
        ),
    link: z
        .string({
            required_error: "Field 'link' is required",
            invalid_type_error: "Field 'link' must be a string",
        })
        .trim()
        .min(3, "Field 'link' should contain at least 3 characters")
        .max(191, "Field 'link' should contain a maximum of 191 characters"),
    tags: z
        .string({
            required_error: "Field 'tags' is required",
            invalid_type_error: "Field 'tags' must be a string array",
        })
        .trim()
        .min(2, "Each tag should contain at least 2 characters")
        .max(50, "Each tag should contain a maximum of 50 characters")
        .array(),
    image_id: z.number({
        required_error: "Field 'image_id' is required",
        invalid_type_error: "Field 'image_id' must be a number",
    }),
});

export const getAll = z.object({
    user_id: z
        .number({
            invalid_type_error: "Param 'user_id' must be a number",
        })
        .nullable(),
});

export const getById = z.object({
    project_id: z.number({
        required_error: "Param 'project_id' is required",
        invalid_type_error: "Param 'project_id' must be a number",
    }),
});

export const getByTag = z.object({
    user_id: z
        .number({
            invalid_type_error: "Param 'user_id' must be a number",
        })
        .nullable(),
    tag: z.string({
        required_error: "Query string 'tag' is required",
    }),
});

export const getByUserIdAndId = z.object({
    user_id: z.number({
        required_error: "Param 'user_id' is required",
        invalid_type_error: "Param 'user_id' must be a number",
    }),
    project_id: z.number({
        required_error: "Param 'project_id' is required",
        invalid_type_error: "Param 'project_id' must be a number",
    }),
});
