import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController.js";

const router = Router();

router.get("/users", getUsers);
router.post("/user", addUser);

export default router;
