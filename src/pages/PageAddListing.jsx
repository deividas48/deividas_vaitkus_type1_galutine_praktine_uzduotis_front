// src\pages\PageAddListing.jsx

/* eslint-disable no-console */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/Forms.css';
import axios from 'axios';
import Submit from '../components/buttons/Submit';
import VPageAddListingImg from '../components/forms/validations/VPageAddListingImg';

export default function PageAddListing() {
  // Get the image validation schema
  const { imageValidation } = VPageAddListingImg();

  // Dummy data for town and category mappings
  const townMappings = {
    Vilnius: 3,
    Kaunas: 4,
    // Add more town mappings here
  };

  const categoryMappings = {
    Kompiuteriai: 1,
    Telefonai: 2,
    // Add more category mappings here
  };

  const formik = useFormik({
    initialValues: {
      // Create initial values for the form
      title: '',
      description: '',
      price: '',
      phone: '+3706',
      type: '',
      user_id: '5', // user_id I'll not be used in the form. Default value is set because the value can't be null.
      town: '', // Default value for testing
      category: '', // Default value for testing
      photoLMain: null,
      photoL1: null,
      photoL2: null,
      photoL3: null,
      photoL4: null,
      photoL5: null,
      photoL6: null,
      photoL7: null,
      photoL8: null,
      photoL9: null,
    },
    // Create a validation schema using Yup
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, '• Title must be at least 3 characters')
        .max(100, '• Title must be less than 100 characters')
        .required('• Title is required'),
      description: Yup.string()
        .max(800, '• Description must be less than 800 characters')
        .required('• Description is required'),
      price: Yup.number()
        .min(0, '• Price cannot be negative')
        .required('• Price is required'),
      phone: Yup.string()
        .required('• Phone number is required')
        .test(
          'startsWithPlus',
          '• Phone number must start with a plus',
          (value) => value && value.startsWith('+'),
        )
        .test(
          'onlyNumbersAfterPlus',
          '• Phone number can only contain digits after the plus',
          (value) => value && /^[+][0-9]+$/.test(value),
        )
        .min(
          11,
          '• Phone number must be at least 11 digits, including the plus',
        )
        .max(
          16,
          '• Phone number must be less than 16 digits, including the plus',
        ),
      type: Yup.string().required('• Type is required'),
      town: Yup.string().required('• Town is required'),
      category: Yup.string().required('• Category is required'),
      photoLMain: imageValidation,
      photoL1: imageValidation,
      photoL2: imageValidation,
      photoL3: imageValidation,
      photoL4: imageValidation,
      photoL5: imageValidation,
      photoL6: imageValidation,
      photoL7: imageValidation,
      photoL8: imageValidation,
      photoL9: imageValidation,
    }),

    // Create a function to handle form submission.
    // Currently, it just displays the form values in an alert
    onSubmit: async (values) => {
      try {
        // 1. Map town and category names to their respective IDs. Output: Values + mapped values.
        const mappedValues = {
          ...values,
          town_id: townMappings[values.town],
          category_id: categoryMappings[values.category],
        };

        // 2. Remove original town and category fields (names) from the payload
        delete mappedValues.town;
        delete mappedValues.category;

        // 3. Create a FormData object. What it does: Allows you to bundle all the form fields and files together to send in one request.
        const formData = new FormData();

        // 4. Append all other form fields to FormData. Purpose: Adds all form fields to formData except the 'photos' field.
        Object.keys(mappedValues).forEach((key) => {
          if (
            key !== 'photoLMain' &&
            key !== 'photoL1' &&
            key !== 'photoL2' &&
            key !== 'photoL3' &&
            key !== 'photoL4' &&
            key !== 'photoL5' &&
            key !== 'photoL6' &&
            key !== 'photoL7' &&
            key !== 'photoL8' &&
            key !== 'photoL9'
          ) {
            // exept photos
            formData.append(key, mappedValues[key]); // Pack this information into a special package called formData to send it to the server. Key - forms heders, mappedValues[key] - values. Like: (color, raudona) and etc.
          }
        });

        // 5. Append selected file (image) to FormData. Attach: "variable name, value".
        if (values.photoLMain) {
          formData.append('photoLMain', values.photoLMain);
        }
        if (values.photoL1) {
          formData.append('photoL1', values.photoL1);
        }
        if (values.photoL2) {
          formData.append('photoL2', values.photoL2);
        }
        if (values.photoL3) {
          formData.append('photoL3', values.photoL3);
        }
        if (values.photoL4) {
          formData.append('photoL4', values.photoL4);
        }
        if (values.photoL5) {
          formData.append('photoL5', values.photoL5);
        }
        if (values.photoL6) {
          formData.append('photoL6', values.photoL6);
        }
        if (values.photoL7) {
          formData.append('photoL7', values.photoL7);
        }
        if (values.photoL8) {
          formData.append('photoL8', values.photoL8);
        }
        if (values.photoL9) {
          formData.append('photoL9', values.photoL9);
        }

        // 6. Make the API request using axios. // Send POST request
        const response = await axios.post(
          'http://localhost:3000/api/listings',
          formData, // - all the values that is submitted and arranged. Pepared to send to the back-end.
          {
            headers: {
              'Content-Type': 'multipart/form-data', // When uploading files (like photos), using 'multipart/form-data' allows both text and binary data to be transmitted.
            },
          },
        );

        // 7. Handle the response
        console.log('Data submitted successfully:', response.data);
      } catch (error) {
        // 8. Error handling
        console.error('Error submitting data:', error.message);
      }
    },
  });

  // Function to handle the price input onBlur event
  const handlePriceBlur = (event) => {
    // Parse the input value to a float. ParseFloat returns NaN if the input is not a number
    const value = parseFloat(event.target.value);
    // Check if the value is not NaN. If it is a number,
    // set the field value to a fixed two decimal places
    if (!Number.isNaN(value)) {
      // Set the field value to a fixed two decimal places
      formik.setFieldValue('price', value.toFixed(2)); // setFieldValue is a Formik function to set the value of a field in the form. It takes two arguments: the field name (input name) and the value to set.
    }
  };

  return (
    // Add a container to center the form and provide padding
    <main className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
      <h1 className="titleOfForm ">Complete your listing</h1>
      {/* Create a form using Formik */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col py-4 w-full"
        noValidate // Disable the browser's HTML5 native validation
      >
        {/* Create a form field for the title */}
        <div className="pairs">
          <label htmlFor="title" className="pairs_label_full">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Ensure Formik's onBlur is used for validation
            value={formik.values.title}
            required // Ensures the field must be filled out
            minLength={3} // Minimum length for adequate description
            maxLength={100} // Maximum length to prevent overly verbose titles
            placeholder="Enter a title for your item, e.g., 'Purple iPhone 13'"
            // aria-describedby="titleHelp" // ID for an element containing additional description
            autoComplete="on" // Consider "on" if previous titles should be suggested
            className="pairs_input_full"
          />
          {/* Display an error message if the field has been touched and has an error */}
        </div>
        {/* If the title field has been touched and has an error, display the error message */}
        {formik.touched.title && formik.errors.title ? (
          <div className="YupValidation mt-0 md:-mt-4">
            {formik.errors.title}
          </div>
        ) : null}
        {/* Create a form field for the description */}
        <div className="pairs">
          <label htmlFor="description" className="pairs_label_full">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.description}
            required // Ensures the field must be filled out
            maxLength={800}
            placeholder="Provide a detailed description of your item..."
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_textarea_full pairs_input_full"
          />
        </div>
        {formik.touched.description && formik.errors.description ? (
          <div className="YupValidation mt-0 md:-mt-4">
            {formik.errors.description}
          </div>
        ) : null}
        {/* Create a form field for the price */}
        <div className="pairsOfTwo">
          <div className="margin" />
          <label
            htmlFor="price"
            // Conditional class to prevent the phone error
            // message from overlapping the price error message
            className={`pairs_label_full label_price ${
              formik.touched.price ? 'elimInher' : ''
            }`}
          >
            Price (€):
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={(e) => {
              handlePriceBlur(e);
              formik.handleBlur(e);
            }} // handlePriceBlur is for formatting the price. // For triggering validation
            value={formik.values.price}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            min="0" // Ensures the price cannot be negative
            step="1.00" // Allows for two decimal places, useful for prices
            required
            placeholder="Enter the price"
            // width 10 proc.
            className={`pairs_input_firstHalf_width_12_5proc pairs_input_notFull ${
              formik.touched.price ? 'elimInher' : ''
            }`}
          />
          {/* Display an error message if the field has been touched and has an error */}
          {formik.touched.price && formik.errors.price ? (
            // Complicated conditional class workaround to prevent
            // the phone error message from overlapping the price error message
            <div className="YupValidation -mt-4 md:hidden">
              {formik.errors.price}
            </div>
          ) : null}
          <label
            htmlFor="phone"
            className={`pairs_label_secoundHalf pairs_label_secHalf_width_12_5proc ml-3 pairs_label_full_md ${
              formik.touched.price ? 'elimInher' : ''
            }`}
          >
            Phone:
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.phone}
            required
            placeholder="E.g., +3706XXXXXXX"
            className={`pairs_input_notFull pairs_input_secHalf_width_25proc ${
              formik.touched.price ? 'elimInher' : ''
            }`}
          />
        </div>
        {/* If the price field has been touched and has an error, display the error message */}
        {formik.touched.price && formik.errors.price ? (
          // Complicated conditional class workaround to prevent
          // the phone error message from overlapping the price error message
          <div
            className={`YupValidation hidden md:block ${
              formik.touched.price && formik.errors.price ? 'mb-0' : ''
            }`}
          >
            {formik.errors.price}
          </div>
        ) : null}
        {/* If the phone field has been touched and has an error, display the error message */}
        {formik.touched.phone && formik.errors.phone ? (
          // Complicated conditional class workaround to prevent
          // the phone error message from overlapping the price error message
          <div
            className={`YupValidation addTop ${
              !formik.touched.price ? 'removeTop' : ''
            }`}
          >
            {formik.errors.phone}
          </div>
        ) : null}
        <div className="w-1/3" />
        {/* Create a form field for the type */}
        <div className="pairs">
          <label htmlFor="type" className="pairs_label_full">
            Listing type:
          </label>
          <select
            id="type"
            name="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.type}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          >
            <option value="">Select a type</option>
            <option value="sell">Sell</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        {/* If the type field has been touched and has an error, display the error message */}
        {formik.touched.type && formik.errors.type ? (
          <div className="YupValidation mt-0 md:-mt-4">
            {formik.errors.type}
          </div>
        ) : null}
        {/* Create a form field for the town */}
        <div className="pairs">
          <label htmlFor="town" className="pairs_label_full">
            Town:
          </label>
          <select
            id="town"
            name="town"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.town}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          >
            <option value="">Select a Town</option>
            <option value="Vilnius">Vilnius</option>
            <option value="1">1</option>
          </select>
        </div>
        {/* If the town field has been touched and has an error, display the error message */}
        {formik.touched.town && formik.errors.town ? (
          <div className="YupValidation mt-0 md:-mt-4">
            {formik.errors.town}
          </div>
        ) : null}
        {/* Create a form field for the category */}
        <div className="pairs">
          <label htmlFor="category" className="pairs_label_full">
            Category:
          </label>
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.category}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          >
            <option value="">Select a category</option>
            <option value="Kompiuteriai">Kompiuteriai</option>
            <option value="1">1</option>
          </select>
        </div>
        {/* If the category field has been touched and has an error,
         display the error message */}
        {formik.touched.category && formik.errors.category ? (
          <div className="YupValidation mt-0 md:-mt-4">
            {formik.errors.category}
          </div>
        ) : null}

        <section>
          {/* photoLMain */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotos" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotos"
                name="photoLMain"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoLMain', // store the selected files in the form state under the key 'photoLMain'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoLMain && formik.errors.photoLMain ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoLMain}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoLMain && (
              <div className="selected-files">
                <h3>Selected photoLMain:</h3>
                <ul>
                  {/* formik.values.photoLMain.name holds the selected files */}
                  <li>{formik.values.photoLMain.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL1 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL1" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL1"
                name="photoL1"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL1', // store the selected files in the form state under the key 'photoL1'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL1 && formik.errors.photoL1 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL1}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL1 && (
              <div className="selected-files">
                <h3>Selected photoL1:</h3>
                <ul>
                  {/* formik.values.photoL1.name holds the selected files */}
                  <li>{formik.values.photoL1.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL2 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL2" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL2"
                name="photoL2"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL2', // store the selected files in the form state under the key 'photoL2'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL2 && formik.errors.photoL2 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL2}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL2 && (
              <div className="selected-files">
                <h3>Selected photoL2:</h3>
                <ul>
                  {/* formik.values.photoL2.name holds the selected files */}
                  <li>{formik.values.photoL2.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL3 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL3" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL3"
                name="photoL3"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL3', // store the selected files in the form state under the key 'photoL3'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL3 && formik.errors.photoL3 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL3}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL3 && (
              <div className="selected-files">
                <h3>Selected photoL3:</h3>
                <ul>
                  {/* formik.values.photoL3.name holds the selected files */}
                  <li>{formik.values.photoL3.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL4 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL4" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL4"
                name="photoL4"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL4', // store the selected files in the form state under the key 'photoL4'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL4 && formik.errors.photoL4 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL4}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL4 && (
              <div className="selected-files">
                <h3>Selected photoL4:</h3>
                <ul>
                  {/* formik.values.photoL4.name holds the selected files */}
                  <li>{formik.values.photoL4.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL5 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL5" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL5"
                name="photoL5"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL5', // store the selected files in the form state under the key 'photoL5'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL5 && formik.errors.photoL5 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL5}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL5 && (
              <div className="selected-files">
                <h3>Selected photoL5:</h3>
                <ul>
                  {/* formik.values.photoL5.name holds the selected files */}
                  <li>{formik.values.photoL5.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL6 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL6" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL6"
                name="photoL6"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL6', // store the selected files in the form state under the key 'photoL6'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL6 && formik.errors.photoL6 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL6}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL6 && (
              <div className="selected-files">
                <h3>Selected photoL6:</h3>
                <ul>
                  {/* formik.values.photoL6.name holds the selected files */}
                  <li>{formik.values.photoL6.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL7 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL7" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL7"
                name="photoL7"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL7', // store the selected files in the form state under the key 'photoL7'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL7 && formik.errors.photoL7 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL7}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL7 && (
              <div className="selected-files">
                <h3>Selected photoL7:</h3>
                <ul>
                  {/* formik.values.photoL7.name holds the selected files */}
                  <li>{formik.values.photoL7.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL8 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL8" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL8"
                name="photoL8"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL8', // store the selected files in the form state under the key 'photoL8'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL8 && formik.errors.photoL8 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL8}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL8 && (
              <div className="selected-files">
                <h3>Selected photoL8:</h3>
                <ul>
                  {/* formik.values.photoL8.name holds the selected files */}
                  <li>{formik.values.photoL8.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>

          {/* photoL9 */}
          <div>
            <div className="pairs">
              <label htmlFor="IDPhotoL9" className="pairs_label_full">
                Photos:
              </label>
              <input
                id="IDPhotoL9"
                name="photoL9"
                type="file"
                // "P.S. The purpose of the onChange function with formik.setFieldValue() is to handle the front-end, and it doesn't have any role in sending images to the back-end."
                onChange={(event) => {
                  formik.setFieldValue(
                    'photoL9', // store the selected files in the form state under the key 'photoL9'.
                    // Take the selected files
                    event.currentTarget.files[0], // Handle only the first file in the FileList for single upload
                  );
                }}
                className="pairs_input_full"
              />
            </div>
            {/* Handle Validation Errors (Optional) */}
            {formik.touched.photoL9 && formik.errors.photoL9 ? (
              <div className="YupValidation mt-0 md:-mt-4">
                {formik.errors.photoL9}
              </div>
            ) : null}
            {/* Display Selected Files (User Feedback) */}
            {formik.values.photoL9 && (
              <div className="selected-files">
                <h3>Selected photoL9:</h3>
                <ul>
                  {/* formik.values.photoL9.name holds the selected files */}
                  <li>{formik.values.photoL9.name}</li>
                  {/* Only show the single file's name */}
                </ul>
              </div>
            )}
          </div>
        </section>
        {/* Submit form button */}
        <Submit />
      </form>
    </main>
  );
}
