import { z } from "zod";
//validação dos dados com ZOD
const userSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
    avatar_id: z.number().optional(),
});
export default userSchema;
