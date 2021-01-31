import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let state = props.profilePage;
  let postElements = state.posts.map((p) => (
    <Post id={p.id} message={p.message} likesCount={p.likesCount} />
  ));
  let newPostText = state.newPostText;

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = (e) => {
    let text = e.target.value;
    props.postChange(text);
  };

  return (
    <div className={s.postsBlock}>
      <h2>my posts</h2>
      <div>
        <div>
          <textarea onChange={onPostChange} value={newPostText}></textarea>
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
