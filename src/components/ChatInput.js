import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { addMessage } from '../features/messagesSlice';
import { db, postConverter, timestamp } from '../firebase/config';
import Message from '../actions/Message';

const ChatInput = ({ channelName, channelId, bottomRef, user }) => {
  const [text, setText] = useState('');
  const inputRef = useRef();
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    if (!channelId) {
      return false;
    }
    // console.log(inputRef.current.value);
    console.log(`onsubmit : ${text}`);

    const ref = db.collection('channels');
    const msg = new Message(text, timestamp, user.displayName, user.photoURL);
    const prom = ref
      .doc(channelId)
      .collection('messages')
      .withConverter(postConverter)
      .add(msg);
    prom.then((doc) =>
      doc.get().then((doc) => {
        msg.createdAt = doc.data().createdAt;
        dispatch(
          addMessage({
            channelId: channelId,
            message: msg,
          }),
        );
        bottomRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }),
    );

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
