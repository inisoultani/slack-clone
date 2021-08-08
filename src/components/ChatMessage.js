import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getMessageByChannelId,
  getMessages,
  getMessagesByChannelIdThunk,
} from '../features/messagesSlice';

const ChatMessage = ({ channelId = '' }) => {
  // const selectorObj = getMessages);
  const messagesByChannelId = useSelector(getMessages);

  const renderChatMessageList = (channelId) => {
    if (!messagesByChannelId[channelId]) {
      return 'please select channel id';
    }
    return messagesByChannelId[channelId].map((message) => {
      return <li key={message}>{message}</li>;
    });
  };

  useEffect(() => {
    console.log(`channel id now : ${channelId}`);
  }, [messagesByChannelId, channelId]);

  return (
    <ChatMessageStyled>
      <ul>{renderChatMessageList(channelId)}</ul>
    </ChatMessageStyled>
  );
};

export default ChatMessage;

const ChatMessageStyled = styled.div``;
