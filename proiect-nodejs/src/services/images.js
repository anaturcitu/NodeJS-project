import httpError from "../utils/httpError.js";
import PrismaErrors from "../constants/prisma-errors.js";

import prisma from "../../client.js";

const createImage = async (imageData, postId) => {
    try {
        const result = await prisma.image.create({
            data: {
                ...imageData,
                post: {
                    connect: {
                        id: postId
                    }
                },
            },
            include: {
                post: true,
            }
        });
        return result
    } catch (error) {
        throw new httpError(400, error.message);
    }
};

const deleteImage = async (imageId) => {
    const result = await prisma.image.delete({
        where: {
            id: imageId,
        },
    }).catch((error) => {
        if (error.code === PrismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, `Image with id ${imageId} not found`);
        }
        throw new httpError(400, error.message);
    });

    return result;
};

export default {
    createImage,
    deleteImage
};
