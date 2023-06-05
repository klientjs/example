import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import klient from '../api';
import PostResource from '../api/resources/post';
import type { Post } from '../api/models/Post';

function HomePage(): React.ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const resource = klient.resource('Post') as PostResource;

  const fetch = () => {
    setLoading(true);
    resource.list({ active: true }).then((collection) => {
      setPosts(collection);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {/* Header */}
      <h3 className="pm-text-center">Last published posts</h3>
      <hr />

      {/* Loader */}
      {loading && <div className="pm-h5 pm-text-center">Loading...</div>}

      {/* Empty result message */}
      {!loading && !posts.length && <div className="pm-text-center">No result</div>}

      {/* Post list */}
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`} state={{ title: post.title }}>
          <div className="pm-h4 pm-ground pm-padded pm-stacked">{post.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
