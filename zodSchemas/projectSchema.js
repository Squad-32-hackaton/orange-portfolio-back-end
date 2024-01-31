import { z } from "zod";

const projectSchema = z.object({
    title: z.string({
        required_error: "Field 'title' is required",
        invalid_type_error: "Field 'title' must be a string",
    }),
    description: z.string({
        required_error: "Field 'description' is required",
        invalid_type_error: "Field 'description' must be a string",
    }),
    link: z.string({
        required_error: "Field 'link' is required",
        invalid_type_error: "Field 'link' must be a string",
    }),
    tags: z
        .string({
            required_error: "Field 'tags' is required",
            invalid_type_error: "Field 'tags' must be a string array",
        })
        .array(),
    image_id: z.number({
        required_error: "Field 'image_id' is required",
        invalid_type_error: "Field 'image_id' must be a number",
    }),
});

export default projectSchema;
