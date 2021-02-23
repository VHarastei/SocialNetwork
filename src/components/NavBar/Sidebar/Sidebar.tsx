import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import { FriendsType } from '../../../types/types';
import s from './Sidebar.module.css';

type PropsType = {
  friends: Array<FriendsType>;
};

const Sidebar: FC<PropsType> = ({ friends }) => {
  return (
    <div className={s.sidebar}>
      <div className={s.sidebarText}>Friends</div>
      <div className={s.sidebarItems}>
        {friends.map((friend) => (
          <SidebarItem key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

type SidebarItemPropsType = {
  friend: FriendsType;
};

const SidebarItem: FC<SidebarItemPropsType> = ({ friend }) => {
  return (
    <div className={s.sidebarItem}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
        alt="img"
      />
      <div>{friend.name}</div>
    </div>
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    friends: state.sidebar.friends,
  };
};

const SidebarContainer = connect<PropsType, {}, {}, AppStateType>(mapStateToProps)(Sidebar);

export default SidebarContainer;
