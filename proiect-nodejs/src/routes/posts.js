import express from "express";
import validate from "../middlewares/validate.js";
import postsValidations from "../validations/posts.js";
import postsController from "../controllers/posts.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./storage/"); // Define destination folder for storing uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Define filename for uploaded image
    },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostDto'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request, validation error

 */
router
    .route("/")
    .post(validate(postsValidations.createPost), postsController.createPost)
    .get(postsController.getPosts);


/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Retrieve a specific post by ID
 *     tags: [Posts]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostDto'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Bad request, validation error
 *       404:
 *         description: Post not found
 *
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router
    .route("/:postId")
    .get(postsController.getPost)
    .put(validate(postsValidations.updatePost), postsController.updatePost)
    .delete(postsController.deletePost);



/**
 * @swagger
 * /posts/{postId}/images:
 *   post:
 *     summary: Upload a new image
 *     tags: [Images]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       400:
 *         description: Bad request, validation error
 */
router
    .route("/:postId/images")
    .post(upload.single("image"), postsController.uploadImage);

/**
 * @swagger
 * /posts/{postId}/images/{imageId}:
 *   delete:
 *     summary: Delete a specific image by ID
 *     tags: [Images]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 */
router
    .route("/:postId/images/:imageId")
    .delete(postsController.deleteImage);

export default router;
