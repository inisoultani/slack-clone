import { nanoid } from "nanoid";

class Comment {
  constructor(commentText) {
    this.text = commentText;
    this.id = nanoid();
    this.createdAt = new Date().toISOString();
  }
}

export default Comment;
