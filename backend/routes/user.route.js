import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { deleteUser, getNotificationsCount, getUser, getUsers, profilePosts, savePost, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
// router.get("/search/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotificationsCount);

export default router;