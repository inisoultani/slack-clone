import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const ChatInput = ({ channelName, channelId }) => {
  const [text, setText] = useState('');
  const inputRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(inputRef.current.value);
    console.log(`onsubmit : ${text}`);
    inputRef.current.value = '';
  };

  return (
    <ChatInputStyled>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
          placeholder={`Message #${channelName}`}
        />
        <Button>SEND</Button>
      </form>
    </ChatInputStyled>
  );
};

export default ChatInput;

const ChatInputStyled = styled.div`
  position: relative;
  & form {
    display: flex;
    justify-content: center;

    & Button {
      display: none;
    }

    & input {
      padding: 10px;
      border: 1px solid gray;
      width: 60%;
      border-radius: 3px;
      position: fixed;
      bottom: 40px;
    }
  }
`;
