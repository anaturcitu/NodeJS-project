import httpError from "../utils/httpError.js";
import PrismaErrors from "../constants/prisma-errors.js";

import prisma from "../../client.js";

const createPost = async (postData, userId) => {
    const result = await prisma.post.create({
        data: {
            ...postData,
            author: {
                connect: {
                    id: userId
                }
            },
            tags: {
                create: postData?.tags.map(tag => (
                    {
                        name: tag
                    }
                ))
            }
        },
        include: {
            author: true,
            tags: true
        }
    }).catch((error) => {
        throw new httpError(400, error.message);
    });

    return result;
};

const getPost = async (postId) => {
    const result = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            author: true,
            comments: {
                include: {
                    author: true
                }
            },
            images: true,
            tags: true,
        },
    }).catch((error) => {
        if (error.code === PrismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, `Post with id ${postId} not found`);
        }
        throw new httpError(400, error.message);
    });

    return result;
};

const updatePost = async (postId, postData) => {
    try {
        const result = await prisma.$transaction([
            prisma.tag.deleteMany({where: {postId: postId}}),
            prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    ...postData,
                    tags: {
                        create: postData?.tags.map(tag => (
                            {
                                name: tag
                            }
                        ))
                    }
                },
                include: {
                    author: true,
                    tags: true
                }
            })
        ]);
        return result[1];
    } catch (error) {
        if (error.code === PrismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, `Post with id ${postId} not found`);
        }
        throw new httpError(400, error.message);
    }
};

const deletePost = async (postId) => {
    const result = await prisma.post.delete({
        where: {
            id: postId,
        },
    }).catch((error) => {
        if (error.code === PrismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, `Comment with id ${commentId} not found`);
        }
        throw new httpError(400, error.message);
    });

    return result;
};

const getPosts = async () => {
    try {
        const result = await prisma.post.findMany({
            include: {
                author: true,
                comments: {
                    include: {
                        author: true
                    }
                },
                images: true,
                tags: true,
            },
        });
        return result;
    } catch (error) {
        throw new httpError(400, error.message);
    }
};

export default {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getPosts,
};
