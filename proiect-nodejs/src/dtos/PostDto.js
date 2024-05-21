import {UserDto} from "./UserDto.js";
import {CommentDto} from "./CommentDto.js";

export class PostDto {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.author = new UserDto(post.author);
        this.comments = post.comments.map(comment => new CommentDto(comment));
        this.tags = post.tags.map(tag => tag.name);
        this.images = post.images.map(image => image.url);
        this.content = post.content;
        this.createdAt = post.createdAt;
    }
}