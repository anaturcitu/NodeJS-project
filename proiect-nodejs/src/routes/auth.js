import express from "express";
import validate from "../middlewares/validate.js";
import authValidations from "../validations/auth.js";
import authController from "../controllers/auth.js";

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, validation error
 */
router
  .route("/signup")
  .post(validate(authValidations.signup), authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Bad request, validation error
 */
router
  .route("/login")
  .post(validate(authValidations.login), authController.login);

export default router;
