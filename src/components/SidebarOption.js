import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectChannel as selectChannelAction } from '../features/appSlice';
import { db } from '../firebase/config';

const SidebarOption = ({
  Icon,
  title,
  addChannelOption,
  id,
  // selectChannelAction,
}) => {
  const dispatch = useDispatch();

  const addChannel = () => {
    console.log('addChannel');
    const channelName = prompt('Please enter the channel name');
    if (channelName) {
      db.collection('channels').add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    console.log('selectChannel');
    if (id) {
      dispatch(selectChannelAction(id));
      // selectChannelAction(id);
    }
  };

  return (
    <SidebarContainerStyle
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannelStyled>
          <span>#</span> {title}
        </SidebarOptionChannelStyled>
      )}
    </SidebarContainerStyle>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectChannelAction: (id) => dispatch(selectChannelAction(id)),
//   };
// };
// export default connect(null, mapDispatchToProps)(SidebarOption);

export default SidebarOption;

const SidebarContainerStyle = styled.div`
  display: flex;
  /* padding: 10px 10px 0 10px; */
  align-items: center;

  &:hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-size: 10px;
    font-weight: 400;
  }

  > .MuiSvgIcon-root {
    padding: 10px;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannelStyled = styled.h3`
  /* display: flex; */
  padding: 10px 0;
  font-weight: 300;
`;
