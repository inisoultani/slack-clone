import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';

import { db } from '../firebase/config';
// import { doc, getDoc } from 'firebase/firestore';
import { selectedChannelId } from '../features/appSlice';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const Chat = () => {
  const channelId = useSelector(selectedChannelId);
  const [roomName, setRoomName] = useState('');

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
        .then((docRef) => setRoomName(docRef.data().name));

      // v9 modular sdk
      // const snap = fetchChannelName(channelId);
      // if (snap.exists()) {
      //   setRoomName(snap.data().name);
      // } else {
      //   console.log('channel name not found');
      // }
    }
  }, [channelId]);

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
      <ChatMessage />
      <ChatInput channelName={roomName} channelId={channelId} />
    </ChatContainerStyled>
  );
};

export default Chat;

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
