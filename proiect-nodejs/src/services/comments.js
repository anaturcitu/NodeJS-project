import httpError from "../utils/httpError.js";
import PrismaErrors from "../constants/prisma-errors.js";

import prisma from "../../client.js";

// Create a new comment
const createComment = async (commentData, userId) => {
    const result = await prisma.comment.create({
        data: {
            content: commentData.content,
            author: {
                connect: {
                    id: userId
                }
            },
            post: {
                connect: {
                    id: commentData.postId
                }
            }
        },
    }).catch((error) => {
        throw new httpError(400, error.message);
    })

    return result;
};

// Retrieve a specific comment by ID
const getComment = async (commentId) => {
    const result = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
        include: {
            author: true,
            post: true
        }
    }).catch((error) => {
        if (error.code === PrismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, `Comment with id ${commentId} not found`);
        }
        throw new httpError(400, error.message);
    });

    return result;
};

// Update a comment by ID
const updateComment = async (commentId, commentData) => {
    const result = await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: commentData,
    }).catch((error) => {
        if (error.code === PrismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, `Comment with id ${commentId} not found`);
        }
        throw new httpError(400, error.message);
    })

    return result;
};

// Delete a comment by ID
const deleteComment = async (commentId) => {
    const result = await prisma.comment.delete({
        where: {
            id: commentId,
        },
    }).catch((error) => {
        if (error.code === PrismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, `Comment with id ${commentId} not found`);
        }
        throw new httpError(400, error.message);
    })

    return result;
};

export default {
    createComment,
    getComment,
    updateComment,
    deleteComment,
};
