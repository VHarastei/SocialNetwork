import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts: FC = () => {
  const posts = useSelector((state: AppStateType) => state.profilePage.posts);

  let postElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));
  return (
    <div className={s.postsBlock}>
      <h2>my posts</h2>
      <div>
        <AddNewPostForm />
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

let AddNewPostForm: FC = () => {
  const dispatch = useDispatch();
  const addPost = (newPostText: string) => {
    dispatch(actions.addPost(newPostText));
  };
  const maxLength = (value: string) => {
    let error;
    if (value.length >= 300) {
      error = `Maximum length is 300 symbols`;
    }
    return error;
  };

  return (
    <Formik
      initialValues={{newPostText: ''}}
      onSubmit={({ newPostText }, { resetForm }) => {
        addPost(newPostText);
        resetForm({});
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="newPostText" as="textarea" validate={maxLength} />
          {errors.newPostText && touched.newPostText && <div className={s.error}>{errors.newPostText}</div>}
          <button type="submit">Add post</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyPosts;
