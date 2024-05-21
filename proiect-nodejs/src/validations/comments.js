import Joi from "joi";

// Joi schema for creating a new comment
const createComment = Joi.object({
  postId: Joi.number().required(),
  content: Joi.string().required(),
});

// Joi schema for updating a comment
const updateComment = Joi.object({
  content: Joi.string().required(),
})

export default {
  createComment,
  updateComment,
};
