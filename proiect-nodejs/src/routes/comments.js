import express from "express";
import validate from "../middlewares/validate.js";
import commentsValidations from "../validations/comments.js";
import commentsController from "../controllers/comments.js";

const router = express.Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentDto'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request, validation error
 */
router
    .route("/")
    .post(validate(commentsValidations.createComment), commentsController.createComment);

/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     summary: Retrieve a specific comment by ID
 *     tags: [Comments]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCommentDto'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad request, validation error
 *       404:
 *         description: Comment not found
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router
    .route("/:commentId")
    .get(commentsController.getComment)
    .put(validate(commentsValidations.updateComment), commentsController.updateComment)
    .delete(commentsController.deleteComment);

export default router;
