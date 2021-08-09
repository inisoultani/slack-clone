import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';

import { db } from '../firebase/config';
// import { doc, getDoc } from 'firebase/firestore';
import { selectedChannelId } from '../features/appSlice';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

import { getMessagesByChannelIdThunk } from '../features/messagesSlice';

const Chat = () => {
  const channelId = useSelector(selectedChannelId);
  const [roomName, setRoomName] = useState('');
  const dispatch = useDispatch();
  const bottomRef = useRef();
  const [user] = useAuthState(auth);

  useEffect(() => {
    // const fetchChannelName = async (channelId) => {
    //   const docRef = doc(db, 'channels', channelId);
    //   const snap = await getDoc(docRef);
    //   return snap;
    // };
    const ref = db.collection('channels');
    // .where('id', '==', 'JMxmKRZXNeLVGAPCUEw6');
    if (channelId) {
      // console.log(channelId);
      ref
        .doc(channelId)
        .get()
        .then((docRef) => {
          setRoomName(docRef.data().name);
          // fetch all message related to selectedChannelId
          // and populate the message in redux store
          dispatch(getMessagesByChannelIdThunk(channelId));
        });

      // v9 modular sdk
      // const snap = fetchChannelName(channelId);
      // if (snap.exists()) {
      //   setRoomName(snap.data().name);
      // } else {
      //   console.log('channel name not found');
      // }
    }
  }, [channelId, dispatch]);

  return (
    <ChatContainerStyled>
      <HeaderStyled>
        <HeaderLeftStyled>
          <h4>{`# ${roomName}`}</h4>
          <StarBorderOutlinedIcon />
        </HeaderLeftStyled>
        <HeaderRightStyled>
          <p>
            <InfoOutlinedIcon /> <span>Details</span>
          </p>
        </HeaderRightStyled>
      </HeaderStyled>
      <ChatMessage channelId={channelId} bottomRef={bottomRef} />
      <ChatInput
        channelName={roomName}
        channelId={channelId}
        bottomRef={bottomRef}
        user={user}
      />
      <ChatBottomStyled ref={bottomRef} />
    </ChatContainerStyled>
  );
};

export default Chat;

const ChatBottomStyled = styled.div``;

const ChatContainerStyled = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  /* margin-top: 10px; */
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 20px;
`;

const HeaderLeftStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 0.2;
  justify-content: space-between;
  & > h4 {
    /* border: 1px solid purple; */
    display: flex;
    text-transform: lowercase;
    font-weight: 400;
  }

  & > h4 > .MuiSvgIcon-root {
  }
`;

const HeaderRightStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 0.1;
  & > p {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
