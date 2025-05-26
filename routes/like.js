import express from "express";
import { getLikes, setLike, deleteLike } from "../lib/like_controller.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", setLike);
router.delete("/:id", deleteLike);

export default router;