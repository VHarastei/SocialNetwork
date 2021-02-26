import { connect } from 'react-redux';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import { PostsType } from '../../../types/types';
import MyPosts from './MyPosts';

let addPost =  actions.addPost

type MapStatePropsType = {
  posts: Array<PostsType>;
};

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  { addPost }
)(MyPosts);

export default MyPostsContainer;
