import httpError from "../utils/httpError.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.substring("Bearer ".length);

    if (!token) {
        return next(new httpError(401, 'No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new httpError(401, "Invalid token"));
        }
        req.userId = decoded.id;
        next();
    });
};

export default verifyToken