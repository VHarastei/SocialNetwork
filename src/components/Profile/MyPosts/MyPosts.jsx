import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Form, Field } from 'react-final-form';

const MyPosts = (props) => {
  let state = props.profilePage;
  let postElements = state.posts.map((p) => (
    <Post id={p.id} message={p.message} likesCount={p.likesCount} />
  ));
  return (
    <div className={s.postsBlock}>
      <h2>my posts</h2>
      <div>
        <AddNewPostForm addPost={props.addPost} />
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

let AddNewPostForm = (props) => {
  return (
    <Form
      onSubmit={(obj) => {
        props.addPost(obj.newPostText);
        obj.newPostText = '';
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="newPostText">
            {({ input }) => (
              <input type="text" placeholder="Write new post" {...input} />
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
