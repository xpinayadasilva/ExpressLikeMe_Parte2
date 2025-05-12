import { ControladorLikeMe } from "../controllers/LikeMeControllers.js";
import { Router } from "express";
const router = Router();

// GET /todos
router.get("/", ControladorLikeMe.getAllPosts());

// GET /todos/:id
router.get("/:id", ControladorLikeMe.getByIdPosts());

// POST /todos
router.post("/", ControladorLikeMe.createPost());

// PUT /todos/:id
router.put("/:id", ControladorLikeMe.updatePost());

// DELETE /todos/:id
router.delete("/:id", ControladorLikeMe.removePost());

export default router;
