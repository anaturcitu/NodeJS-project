import {UserDto} from "./UserDto.js";

export class CommentDto {
    constructor(comment) {
        this.id = comment.id;
        this.author = new UserDto(comment.author);
        this.content = comment.content;
    }
}