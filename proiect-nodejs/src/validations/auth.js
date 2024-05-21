import Joi from "joi";

const signup = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(20).required(),
});

const login = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(20).required(),
});

export default {
    signup,
    login,
};
