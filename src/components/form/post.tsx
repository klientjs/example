import React from 'react';
import { Formik, FormikConfig, FormikValues } from 'formik';

function PostForm<T extends FormikValues>(props: FormikConfig<T>): React.ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Formik {...props}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          {(errors as { form?: string }).form}
          <div className="pm-field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="active" data-pm-holder>
              <input
                id="active"
                name="active"
                type="checkbox"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.active}
              />
              Active
            </label>
            <br />
            <span>{errors.active && touched.active && String(errors.active)}</span>
          </div>
          <div className="pm-field">
            <div className="pm-error" data-pm-error={errors.title && touched.title && errors.title}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </div>
          </div>
          <div className="pm-field">
            <div className="pm-error" data-pm-error={errors.content && touched.content && errors.content}>
              <textarea
                name="content"
                placeholder="Content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                rows={10}
              />
            </div>
          </div>
          <button className="pm-btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Loading' : 'Submit'}
          </button>
        </form>
      )}
    </Formik>
  );
}

export default PostForm;
