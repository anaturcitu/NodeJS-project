import Joi from "joi";

// Joi schema for creating a new post
const createPost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().min(1).required()
});

// Joi schema for updating a post
const updatePost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().min(1).required()
})

export default {
    createPost,
    updatePost,
};
