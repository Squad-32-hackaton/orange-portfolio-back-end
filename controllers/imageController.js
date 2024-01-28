import * as imageService from "../services/imageService.js";

export async function create(req, res) {
    const filename = req.file.filename;
    const image = await imageService.create(filename);
    if (!image)
        return res
            .status(409)
            .json({ error: "Error when trying to save the image" });

    res.status(201).json({ image });
}
