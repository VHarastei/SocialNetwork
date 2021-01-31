import React from 'react';
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from '../../../redux/state';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let newPostElement = React.createRef();

  let postElements = props.posts.map((p) => (
    <Post id={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostActionCreator(text));
  };

  return (
    <div className={s.postsBlock}>
      <h2>my posts</h2>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            value={props.newPostText}
            ref={newPostElement}
          ></textarea>
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
