import { createConnection } from "mysql";
import { config } from "dotenv";

config({ path: "./../env" }); // load the database environment variables
const db = createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

export default db;
