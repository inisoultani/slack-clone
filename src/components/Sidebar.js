import React from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/config';

import SidebarOption from './SidebarOption';
const Sidebar = () => {
  const [channels, loading, error] = useCollection(db.collection('channels'));

  return (
    <SidebarContainerStyled>
      <SidebarHeaderStyled>
        <SidebarInfoStyled>
          <h2>Sultan HQ</h2>
          <h3>
            <FiberManualRecordIcon />
            Muhammad Soultani
          </h3>
        </SidebarInfoStyled>
        <CreateIcon />
      </SidebarHeaderStyled>
      <SidebarOption Icon={InsertCommentIcon} title="Thread" />
      <SidebarOption Icon={InboxIcon} title="Mention & Reaction" />
      <SidebarOption Icon={DraftIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & User groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <LineStyled bottomMargin />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <LineStyled topMargin bottomMargin />
      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />
      {/* <SidebarGroupStyled>sidebar group</SidebarGroupStyled> */}
      {/* <SidebarChannelStyled>sidebar channel</SidebarChannelStyled> */}
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainerStyled>
  );
};

export default Sidebar;

const LineStyled = styled.hr`
  border: 0.5px solid #421f44;
  margin-bottom: ${(props) => (props.bottomMargin ? '10px' : '0')};
  margin-top: ${(props) => (props.topMargin ? '10px' : '0')};
`;

const SidebarContainerStyled = styled.div`
  flex: 0.3;
  max-width: 240px;
  background-color: var(--slack-color);
  border-top: 1px solid #421f44;
  color: white;
  /* margin-top: 60px; */
`;

const SidebarHeaderStyled = styled.div`
  /* flex: 0.3; */
  display: flex;
  /* border: 1px solid white; */
  align-items: center;
  justify-content: space-between;
  padding: 13px;
  border-bottom: 1px solid #421f44;

  > .MuiSvgIcon-root {
    padding: 8px;
    background-color: white;
    color: #421f44;
    border-radius: 50%;
  }
`;

const SidebarInfoStyled = styled.div`
  /* flex: 0.8; */
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 10px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 10px;
    margin-right: 10px;
    color: green;
  }
`;

const SidebarGroupStyled = styled.div``;

const SidebarChannelStyled = styled.div``;
