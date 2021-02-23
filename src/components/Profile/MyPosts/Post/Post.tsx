import React, { FC } from 'react';
import s from './Post.module.css';

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img
        className={s.icon}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdCnMXv32Be239UIoWX0J4CZZIdZkfDljCw&usqp=CAU"
        alt="img"
      />
      {props.message}
      <button>like</button>
      {props.likesCount}
    </div>
  );
};

export default Post;
