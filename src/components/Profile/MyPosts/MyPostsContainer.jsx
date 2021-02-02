import React from 'react';
import { connect } from 'react-redux';
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

// const MyPostsContainer = (props) => {
//   let state = props.store.getState().profilePage;

//   let onAddPostClick = () => {
//     props.store.dispatch(addPostActionCreator());
//   };

//   let onPostChange = (text) => {
//     props.store.dispatch(updateNewPostActionCreator(text));
//   };

//   return (
//     <MyPosts
//       profilePage={state}
//       addPost={onAddPostClick}
//       postChange={onPostChange}
//     />
//   );
// };

let mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    postChange: (text) => {
      dispatch(updateNewPostActionCreator(text));
    }
  }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
