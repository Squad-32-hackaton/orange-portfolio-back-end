import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import db from "./db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", uploadRoutes);
app.use("/images", express.static("uploads"));

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

app.use(errorMiddleware);

app.listen(port, () =>
    console.log(
        `Servidor rodando em http://localhost:${port}; ` +
            `pressione Ctrl-C para terminar.`,
    ),
);
