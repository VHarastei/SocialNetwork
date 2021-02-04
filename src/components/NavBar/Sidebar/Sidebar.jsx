import React from 'react';
import s from './Sidebar.module.css';

const Sidebar = (props) => {
  return (
    <div className={s.sidebar}>
      <div className={s.sidebarText}>Friends</div>
      <div className={s.sidebarItems}>
        <div className={s.sidebarItem}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
            alt="img"
          />
          <div>{props.sidebar.friends[0].name}</div>
        </div>
        <div className={s.sidebarItem}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
            alt="img"
          />
          <div>{props.sidebar.friends[1].name}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
