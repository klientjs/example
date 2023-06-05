import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import klient from '../../../api';
import PostResource from '../../../api/resources/post';

import type { Post } from '../../../api/models/Post';

function PostShow(): React.ReactElement {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backToHome = () => navigate('/');

  const fetch = () => {
    setLoading(true);
    (klient.resource('Post') as PostResource)
      .read(id)
      .then((item) => {
        setPost(item);
        setLoading(false);
      })
      .catch(() => {
        backToHome();
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {/* Header */}
      <h3 className="pm-text-center">{post?.title || location.state?.title || 'Loading...'}</h3>
      <hr />

      {/* Loader */}
      {loading && <div className="pm-h5 pm-text-center">Loading...</div>}

      {/* Post content */}
      {post && <div>{post.content}</div>}
    </div>
  );
}

export default PostShow;
