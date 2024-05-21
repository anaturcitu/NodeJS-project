import postsService from "../services/posts.js";
import imagesService from "../services/images.js";
import httpError from "../utils/httpError.js";
import logger from "../utils/logger.js";
import {PostDto} from "../dtos/PostDto.js";

// Create a new post
const createPost = async (req, res, next) => {
    try {
        logger.info(`Creating post`);
        const result = await postsService.createPost(req.body, req.userId);

        res.status(201).send(result);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Retrieve a specific post by ID
const getPost = async (req, res, next) => {
    try {
        const id = +req.params.postId;

        logger.info(`Retrieving post with id: ${id}`);
        const result = await postsService.getPost(id);

        if (!result) {
            next(new httpError(404, `Post with id ${id} not found`)); // Throw custom error if post not found
        }

        res.status(200).send(new PostDto(result));
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Retrieve all posts
const getPosts = async (req, res, next) => {
    try {
        logger.info(`Retrieving all posts`);
        const result = await postsService.getPosts(req.query);

        res.status(200).send(result.map(post => new PostDto(post)));
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Update a post
const updatePost = async (req, res, next) => {
    try {
        const id = +req.params.postId; // Assuming postId is used for post ID
        logger.info(`Updating post with id: ${id}`);
        const result = await postsService.updatePost(id, req.body);

        if (!result) {
            next(new httpError(404, `Post with id ${id} not found`)); // Throw custom error if post not found
        }

        res.status(200).send(result);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Delete a post
const deletePost = async (req, res, next) => {
    try {
        const id = +req.params.postId;
        logger.info(`Deleting post with id: ${id}`);
        const result = await postsService.deletePost(id);

        if (!result) {
            next(new httpError(404, `Post with id ${id} not found`)); // Throw custom error if not found
        }

        res.status(200).send(result);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Upload image to post
const uploadImage = async (req, res, next) => {
    try {
        const postId = +req.params.postId;
        logger.info(`Upload image to post with id: ${postId}`);
        const result = await postsService.getPost(postId);

        if (!result) {
            next(new httpError(404, `Post with id ${postId} not found`)); // Throw custom error if post not found
        }

        const imageResult = await imagesService.createImage({url: req.file.path}, postId);

        res.status(201).send(imageResult);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

// Upload image to post
const deleteImage = async (req, res, next) => {
    try {
        const id = +req.params.postId;
        logger.info(`Upload image to post with id: ${id}`);
        const result = await imagesService.deleteImage(id);

        if (!result) {
            next(new httpError(404, `Image with id ${id} not found`)); // Throw custom error if post not found
        }



        res.status(200).send(result);
    } catch (err) {
        next(err); // Forward error to error handler middleware
    }
};

export default {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
    uploadImage,
    deleteImage
};