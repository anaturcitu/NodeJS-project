import httpError from "../utils/httpError.js";

import prisma from "../../client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (username, password) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
};

const login = async (username, password) => {
    const user = await prisma.user.findUnique({where: {username}});
    if (!user) {
        throw new httpError(401, "Invalid username");
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new httpError(401, "Invalid password");
    }

    // Generate JWT
    return jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
};

export default {
    signup,
    login,
};
