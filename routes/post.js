import express from "express";
// import { setPosts, getPosts , editPost, deletePost, likePost, dislikePost } from "../lib/post_controller.js";
import { setPosts, getPosts , editPost, deletePost} from "../lib/post_controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
//router.patch("/like-post/:id", likePost);
//router.patch("dislike-post/:id", dislikePost)

export default router;