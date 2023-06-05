/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import klient from '../../../api';
import PostResource from '../../../api/resources/post';
import type { Post } from '../../../api/models/Post';

function PostList(): React.ReactElement {
  const [data, setData] = useState<Post[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const resource = klient.resource('Post') as PostResource;

  const fetch = (loader = true) => {
    if (loader) {
      setLoading(true);
    }

    return resource.list().then((d) => {
      setData(d);
      setLoading(false);
    });
  };

  const remove = useCallback(
    (id: string) => {
      setProcessing({ ...processing, [id]: true });

      resource.delete(id).then(() => {
        fetch(false).then(() => {
          setProcessing({ ...processing, [id]: false });
        });
      });
    },
    [processing]
  );

  const activate = useCallback(
    (id: string, value: boolean) => {
      setProcessing({ ...processing, [id]: true });

      resource.activate(id, value).then(() => {
        fetch(false).then(() => {
          setProcessing({ ...processing, [id]: false });
        });
      });
    },
    [processing]
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h3>Post list</h3>
        <div>
          <button className="pm-btn-warning" onClick={() => klient.services.get('resetter').reset()} type="button">
            Reset
          </button>
          &nbsp;
          <button className="pm-btn-primary" onClick={() => navigate('/admin/posts/create')} type="button">
            Create
          </button>
        </div>
      </div>
      <hr />

      {/* Post list */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ width: 80 }}>Active</th>
            <th align="right" style={{ width: 180 }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Loader */}
          {loading && (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          )}

          {/* Empty result message */}
          {!loading && !data?.length && (
            <tr>
              <td colSpan={4}>
                <i>No results</i>
              </td>
            </tr>
          )}

          {/* Post items */}
          {!loading &&
            data?.map((item) => (
              <tr key={item.id} className={processing[item.id] ? 'pm-disabled' : ''}>
                <td>{item.id}</td>
                <td>
                  <Link to={`/posts/${item.id}`}>{item.title}</Link>
                </td>
                <td>
                  <label data-pm-holder="">
                    <input
                      type="checkbox"
                      name="input-toggle"
                      data-pm-checkbox-toggle
                      checked={item.active}
                      onChange={() => activate(item.id, !item.active)}
                      className="pm-no-margin"
                    />
                  </label>
                </td>
                <td align="right">
                  <button onClick={() => navigate(`/admin/posts/${item.id}`)} type="button">
                    Edit
                  </button>
                  &nbsp;
                  <button className="pm-btn-danger" onClick={() => remove(item.id)} type="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
