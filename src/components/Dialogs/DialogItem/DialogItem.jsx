import React from "react";
import s from "../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  let path = `/dialogs/${props.id}`;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}> <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
        alt="img"
      />{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
