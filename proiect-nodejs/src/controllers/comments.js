import commentsService from "../services/comments.js";
import httpError from "../utils/httpError.js";
import logger from "../utils/logger.js";
import { CommentDto } from "../dtos/CommentDto.js";

// Create a new comment
const createComment = async (req, res, next) => {
    try {
        logger.info(`Creating comment`);
        const result = await commentsService.createComment(req.body, req.userId); // Assuming userId is available in request

        res.status(201).send(result);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Retrieve a specific comment by ID
const getComment = async (req, res, next) => {
    try {
        const id = +req.params.commentId;

        logger.info(`Retrieving comment with id: ${id}`);
        const result = await commentsService.getComment(id);

        if (!result) {
            next(new httpError(404, `Comment with id ${id} not found`)); // Throw custom error if comment not found
        }

        res.status(200).send(new CommentDto(result));
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Update a comment
const updateComment = async (req, res, next) => {
    try {
        const id = +req.params.commentId;
        logger.info(`Updating comment with id: ${id}`);
        const result = await commentsService.updateComment(id, req.body);

        if (!result) {
            next(new httpError(404, `Comment with id ${id} not found`)); // Throw custom error if comment not found
        }

        res.status(200).send(result);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Delete a comment
const deleteComment = async (req, res, next) => {
    try {
        const id = +req.params.commentId;
        logger.info(`Deleting comment with id: ${id}`);
        const result = await commentsService.deleteComment(id);

        if (!result) {
            next(new httpError(404, `Comment with id ${id} not found`)); // Throw custom error if comment not found
        }

        res.status(200).send(result);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

export default {
    createComment,
    getComment,
    updateComment,
    deleteComment
};
