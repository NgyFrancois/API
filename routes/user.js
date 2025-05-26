import express from "express";
import { setUser, getUsers , editUser, deleteUser } from "../lib/user_controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", setUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;