import multer from "multer";
import path from "node:path";

export const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, path.resolve("uploads"));
    },
    filename: (_, file, callback) => {
        const time = new Date().getTime();

        callback(null, `${time}_${file.originalname}`);
    },
});
