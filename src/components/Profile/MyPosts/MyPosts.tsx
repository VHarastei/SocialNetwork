import React, { FC } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Form, Field } from 'react-final-form';
import { maxLength } from '../../../utils/validators/validators';
import { PostsType } from '../../../types/types';

type PropsType = {
  posts: Array<PostsType>;
  addPost: (newPostText: string) => void;
};

const MyPosts: FC<PropsType> = ({ posts, addPost }) => {
  let postElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));
  return (
    <div className={s.postsBlock}>
      <h2>my posts</h2>
      <div>
        <AddNewPostForm addPost={addPost} />
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

type AddNewPostFormPropsType = {
  addPost: (newPostText: string) => void;
};

let AddNewPostForm: FC<AddNewPostFormPropsType> = ({ addPost }) => {
  return (
    <Form
      onSubmit={(obj) => {
        addPost(obj.newPostText);
        obj.newPostText = '';
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="newPostText" validate={maxLength(300)}>
            {({ input, meta }) => (
              <div className={s.fieldControl + ' ' + s.error}>
                <textarea type="text" placeholder="Write new post" {...input} />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div>
            <button type="submit">Post</button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default MyPosts;
