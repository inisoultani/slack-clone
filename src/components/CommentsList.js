import React from "react";
import { useSelector } from "react-redux";

const CommentList = () => {
  const comments = useSelector((state) => state.comments);

  const renderCommentList = () => {
    console.log(comments);
    return comments.map((comment) => {
      return (
        <li key={comment.id}>
          {comment.text}, {comment.createdAt}
        </li>
      );
    });
  };

  return <ul>{renderCommentList()}</ul>;
};

export default CommentList;
