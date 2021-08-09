class Message {
  constructor(message, createdAt, user, userImage) {
    this.message = message;
    this.createdAt = createdAt;
    this.user = user;
    this.userImage = userImage;
  }

  toString() {
    return `${this.message} createdAt : ${this.createdAt} by : ${this.user}`;
  }
}

export default Message;
