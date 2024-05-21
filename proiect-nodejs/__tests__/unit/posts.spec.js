import posts from "../../src/services/posts.js";
import jest from "jest-mock";
import client from "../../client";
import httpError from "../../src/utils/httpError.js";

const post = {
    id: 1,
    title: "title",
    content: "description"
};

describe("posts getPost function", () => {
    test("should return post", async () => {
        client.post.findUnique = jest.fn();
        client.post.findUnique.mockResolvedValue(post);

        await expect(posts.getPost(post.id)).resolves.toEqual(post);

        expect(client.post.findUnique).toHaveBeenCalled();
    });

    test("should throw error if post not found", async () => {
        client.post.findUnique = jest.fn();
        client.post.findUnique.mockResolvedValue(null);

        await posts.getPost(post.id).catch((err) => {
            expect(err.statusCode).toEqual(404);
            expect(err.errorMessage).toEqual(`Post with id ${post.id} not found`);
        });
    });
});

describe('deletePost function', () => {
    it('should delete post with valid postId', async () => {
        const postId = 1;
        client.post.delete = jest.fn();
        client.post.delete.mockResolvedValueOnce({ id: postId }); // Mock resolved value of delete method

        // Call deletePost function
        const result = await posts.deletePost(postId);

        // Assertions
        expect(client.post.delete).toHaveBeenCalledTimes(1); // Ensure post delete method is called once
        expect(client.post.delete).toHaveBeenCalledWith({ where: { id: postId } }); // Ensure delete method is called with correct postId
        expect(result).toEqual({ id: postId }); // Ensure delete function returns the correct result
    });

    it('should throw 404 error if post with given postId is not found', async () => {
        const postId = 1;
        const expectedError = new httpError(404, `Post with id ${postId} not found`);
        client.post.delete = jest.fn();
        client.post.delete.mockRejectedValueOnce({ code: 'RECORD_NOT_FOUND' }); // Mock rejected value for not found error

        // Call deletePost function and expect it to throw error
        await expect(posts.deletePost(postId)).rejects.toThrowError(expectedError);

        // Assertions
        expect(client.post.delete).toHaveBeenCalledTimes(1); // Ensure post delete method is called once
        expect(client.post.delete).toHaveBeenCalledWith({ where: { id: postId } }); // Ensure delete method is called with correct postId
    });

    it('should throw 400 error for other errors', async () => {
        const postId = 1;
        const expectedError = new httpError(400, 'Prisma error message');
        client.post.delete = jest.fn();
        client.post.delete.mockRejectedValueOnce(new Error('Prisma error message')); // Mock rejected value for other errors

        // Call deletePost function and expect it to throw error
        await expect(posts.deletePost(postId)).rejects.toThrowError(expectedError);

        // Assertions
        expect(client.post.delete).toHaveBeenCalledTimes(1); // Ensure post delete method is called once
        expect(client.post.delete).toHaveBeenCalledWith({ where: { id: postId } }); // Ensure delete method is called with correct postId
    });
});
