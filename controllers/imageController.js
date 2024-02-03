import { BadRequestError } from "../helpers/api-errors.js";
import * as imageService from "../services/imageService.js";

export async function create(req, res) {
    if (!req.file) throw new BadRequestError("Param 'file' is required");

    const filename = req.file.filename;
    const image = await imageService.create(filename);
    if (!image)
        return res
            .status(500)
            .json({ error: "Error when trying to save the image" });

    res.status(201).json({ image });
}
