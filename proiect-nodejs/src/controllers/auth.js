import logger from "../utils/logger.js";
import authService from "../services/auth.js";

const signup = async (req, res, next) => {
    try {

        const {username, password} = req.body;
        logger.info(`Signup user ${username}`);
        const user = await authService.signup(username, password);

        res.status(201).send({message: 'User created successfully', user});
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        logger.info(`Login user ${username}`);

        const token = await authService.login(username, password);

        res.json({message: 'Login successful', token});
    } catch (error) {
        next(error);
    }
};


export default {
    signup,
    login,
};
