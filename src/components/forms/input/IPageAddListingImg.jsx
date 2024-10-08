// src\components\forms\input\IPageAddListingImg.jsx
// Files (images) inputs

import * as Yup from 'yup';
import '../../../styles/uploadInput.css';

export default function IPageAddListingImg({ name, label, formik }) {
  return (
    <>
      <div className="flex mr-2 mb-2">
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
            // Get the first file from the FileList object
            const file = event.currentTarget.files[0];
            // Set the selected file into Formik's field value to manage form state
            formik.setFieldValue(name, file);
            // If a file was selected, proceed to create an image preview
            if (file) {
              // Instantiate a new FileReader object to read the file data
              const reader = new FileReader();
              // Define an onload callback to set the image's src attribute
              // to the file's data URL once the file is successfully read
              reader.onload = (e) => {
                // Set the image preview element's src to the file's data URL
                document.getElementById(`${name}-preview`).src =
                  e.target.result;
              };
              // Start reading the file as a data URL, which will trigger the onload event
              reader.readAsDataURL(file);
            }
          }}
          className="formInputImg"
        />
        {/* Handle Validation Errors (Optional) */}
        {formik.touched[name] && formik.errors[name] ? (
          <div className="YupValidation mt-0 md:-mt-4 formImageValidation">
            {formik.errors[name]}
          </div>
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
            {/* Display the image preview */}
            <img
              id={`${name}-preview`}
              alt="Preview"
              className="image-preview"
              style={{ maxWidth: '100px', marginTop: '10px' }}
            />
          </div>
        )}
      </div>
    </>
  );
}
