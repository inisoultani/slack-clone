import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { addComment, fetchCommentFromNet } from "../actions";

const CommentBox = () => {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);
    dispatch(addComment(formValues.comment));
  };

  const onClick = () => {
    dispatch(fetchCommentFromNet());
  };

  const renderTextArea = (formProps) => {
    return (
      <div>
        <label>{formProps.label}</label>
        <input autoComplete="off" type="textarea" {...formProps.input} />
      </div>
    );
  };

  return (
    <Form
      onSubmit={onSubmit}
      subscription={{ submitting: true, pristine: true }}
      render={(props) => {
        return (
          <div>
            <form onSubmit={props.handleSubmit}>
              <Field
                name="comment"
                component={renderTextArea}
                label="input comment"
              />
              <button>Submit</button>
            </form>
            <button onClick={onClick}>Fetch from net</button>
          </div>
        );
      }}
    />
  );
};

export default CommentBox;
