import React, { useEffect } from 'react';
import { Formik, FormikErrors } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';

import klient from '../../api';

function Login(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (klient.jwt?.isAuthenticated) {
      navigate('/admin/posts');
    }
  }, []);

  return (
    <div>
      {/* Header */}
      <h3 className="pm-text-center">Login</h3>
      <hr />

      {/* Form */}
      <Formik
        initialValues={{ username: 'admin', password: '' }}
        onSubmit={(credentials, { setSubmitting, setErrors }) => {
          klient
            .login(credentials)
            .then(() => {
              navigate(location.state?.from || '/admin/posts');
            })
            .catch(() => {
              setErrors({ form: 'Bad credentials' } as FormikErrors<unknown>);
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="pm-error pm-text-center pm-stacked" data-pm-error={(errors as { form?: string }).form} />

            <div className="d-flex">
              <div className="pm-field">
                <div className="pm-error" data-pm-error={errors.username && touched.username && errors.username}>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Username"
                  />
                </div>
              </div>
              &nbsp;
              <div className="pm-field">
                <div className="pm-error" data-pm-error={errors.password && touched.password && errors.password}>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
            <button className="pm-btn-block" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Loading' : 'CONNEXION'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
