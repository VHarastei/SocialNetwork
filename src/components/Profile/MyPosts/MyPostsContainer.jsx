import React from 'react';
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
  let state = props.store.getState().profilePage;

  let onAddPostClick = () => {
    props.store.dispatch(addPostActionCreator());
  };

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostActionCreator(text));
  };

  return (
    <MyPosts
      profilePage={state}
      addPost={onAddPostClick}
      postChange={onPostChange}
    />
  );
};

export default MyPostsContainer;
