// src\components\forms\input\IPageAddListingImg.jsx
// Files (images) inputs

import * as Yup from 'yup';

export default function IPageAddListingImg({ name, label, formik }) {
  return (
    <>
      <label htmlFor={name} className="pairs_label_full sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        // P.S. The purpose of the onChange function with formik.setFieldValue()
        // is to handle the front-end, and it doesn't have any role in sending images to the back-end.
        onChange={(event) => {
          formik.setFieldValue(
            name,
            event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
          );
        }}
        className=""
      />
      {/* Handle Validation Errors (Optional) */}
      {formik.touched[name] && formik.errors[name] ? (
        <div className="YupValidation mt-0 md:-mt-4">{formik.errors[name]}</div>
      ) : null}
      {/* Display Selected Files (User Feedback) */}
      {formik.values[name] && (
        <div className="selected-files">
          <h3>Selected {name}:</h3>
          <ul>
            {/* formik.values[name].name holds the selected files */}
            <li>{formik.values[name].name}</li>
            {/* Only show the single file's name */}
          </ul>
        </div>
      )}
    </>
  );
}
