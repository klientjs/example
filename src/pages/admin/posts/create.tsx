import React from 'react';
import { FormikErrors, FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import klient from '../../../api';
import PostForm from '../../../components/form/post';
import PostResource from '../../../api/resources/post';

import type { Post } from '../../../api/models/Post';

const initialValues = {
  title: '',
  content: '',
  active: false
} as Post;

function PostCreate(): React.ReactElement {
  const navigate = useNavigate();
  const resource = klient.resource('Post') as PostResource;

  const backToList = () => navigate('/admin/posts');

  const handleSubmit = (item: Post, { setSubmitting, setErrors }: FormikHelpers<Post>) => {
    resource
      .create(item)
      .then(() => navigate('/admin/posts'))
      .catch((e: AxiosError) => {
        if (e.response?.status === 400) {
          setErrors(e.response.data as FormikErrors<unknown>);
        } else {
          setErrors({
            form: 'An error occured'
          } as FormikErrors<unknown>);
        }

        setSubmitting(false);
      });
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <h3>Create a Post</h3>
        <button className="pm-btn-secondary" onClick={backToList} type="button">
          Back to list
        </button>
      </div>
      <hr />

      {/* Post form */}
      <PostForm onSubmit={handleSubmit} initialValues={initialValues} />
    </>
  );
}

export default PostCreate;
