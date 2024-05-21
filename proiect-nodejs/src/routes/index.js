import express from "express";
import tasks from "./posts.js";
import auth from "./auth.js";
import comments from "./comments.js";
import verifyToken from '../middlewares/protected-routes.js';

const router = express.Router();

router.use("/auth", auth);
router.use("/posts", verifyToken, tasks);
router.use("/comments", verifyToken, comments);

export default router;
