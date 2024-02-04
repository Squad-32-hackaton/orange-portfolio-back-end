import { BadRequestError } from "../helpers/api-errors.js";
import * as imageService from "../services/imageService.js";

export async function create(req, res) {
    if (!req.file) throw new BadRequestError("A imagem deve ser enviada");

    const filename = req.file.filename;
    const image = await imageService.create(filename);
    if (!image)
        return res
            .status(500)
            .json({ error: "Erro ao tentar salvar a imagem" });

    res.status(201).json({ image });
}
