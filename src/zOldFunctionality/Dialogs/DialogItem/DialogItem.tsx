import React, { FC } from 'react';
import s from '../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import { DialogsType } from '../../../types/types';

const DialogItem: FC<DialogsType> = ({ id, name }) => {
  return (
    <div className={s.dialog + ' ' + s.active}>
      <NavLink to={`/dialogs/${id}`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
          alt="img"
        />
        {name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
