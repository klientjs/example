import React, { useEffect, useState } from 'react';
import { FormikErrors, FormikHelpers } from 'formik';
import { AxiosError } from '@klient/core';
import { useNavigate, useParams } from 'react-router-dom';

import klient from '../../../../api';
import PostForm from '../../../../components/form/post';

import type { Post } from '../../../../api/models/Post';
import type PostResource from '../../../../api/resources/post';

function PostEdit(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Post | undefined>();
  const [loading, setLoading] = useState(true);

  const resource = klient.resource('Post') as PostResource;

  const handleSubmit = (item: Post, { setSubmitting, setErrors }: FormikHelpers<Post>) => {
    resource
      .update<Post>(item)
      .then(() => {
        navigate('/admin/posts');
      })
      .catch((e: AxiosError) => {
        if (e.response?.status === 400) {
          setErrors(e.response.data as FormikErrors<Post>);
        } else {
          setErrors({
            form: 'An error occured'
          } as FormikErrors<Post>);
        }

        setSubmitting(false);
      });
  };

  const fetch = () => {
    resource
      .read(id)
      .then((i) => {
        setData(i);
        setLoading(false);
      })
      .catch(() => {
        navigate('/admin/posts');
      });
  };

  const backToList = () => navigate('/admin/posts');

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h3>Edit Post #{id}</h3>
        <button className="pm-btn-secondary" onClick={backToList} type="button">
          Back to list
        </button>
      </div>
      <hr />

      {/* Loader */}
      {loading && <div className="pm-h5 pm-text-center">Loading...</div>}

      {/* Post form */}
      {data && <PostForm initialValues={data as Post} onSubmit={handleSubmit} />}
    </div>
  );
}

export default PostEdit;
