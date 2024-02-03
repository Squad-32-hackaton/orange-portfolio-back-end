import "express-async-errors";
import "dotenv/config.js";
import http from "http";
import https from "https";
import fs from "fs";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import {
    loginRoutes,
    projectRoutes,
    uploadRoutes,
    userRoutes,
} from "./routes/index.js";
import db from "./database/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
const app = express();

app.use(bodyParser.json());
app.use(cors());
// Home
app.get("/", (_, res) => {
    res.json({ message: "API running successfully" });
});

app.use("/", userRoutes);
app.use("/", loginRoutes);
app.use("/", projectRoutes);
app.use("/", uploadRoutes);
app.use("/images", express.static("uploads"));

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the Database!:", err);
    } else {
        console.log("Connecting to the Database!");
    }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);

function startServer(port, server) {
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === "production") {
    // Get key and certificate from the server
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT),
    };

    const securityServer = https.createServer(options, app);
    startServer(80, regularServer);
    startServer(443, securityServer);
} else {
    const port = process.env.PORT || 3000;
    startServer(port, regularServer);
}
