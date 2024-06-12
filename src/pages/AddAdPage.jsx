import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/Forms.css';
import Submit from '../components/buttons/Submit';

export default function AddAdPage() {
  const formik = useFormik({
    initialValues: {
      // Create initial values for the form
      title: '',
      description: '',
      price: '',
      phone: '',
      type: '',
      town: '',
      category: '',
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
    }),
    // Create a function to handle form submission.
    // Currently, it just displays the form values in an alert
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Just for demonstration
    },
  });

  // Function to handle the price input onBlur event
  const handlePriceBlur = (event) => {
    // Parse the input value to a float. ParseFloat returns NaN if the input is not a number
    const value = parseFloat(event.target.value);
    // If the value is a number, set the field value to a fixed two decimal places
    if (!isNaN(value)) {
      // Set the field value to a fixed two decimal places
      formik.setFieldValue('price', value.toFixed(2)); // setFieldValue is a Formik function to set the value of a field in the form. It takes two arguments: the field name (input name) and the value to set.
    }
  };

  return (
    // Add a container to center the form and provide padding
    <div className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
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
          <div className="YupValidation">{formik.errors.title}</div>
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
          <div className="YupValidation">{formik.errors.description}</div>
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
            <option value="type1">Type 1</option>
          </select>
        </div>
        {/* If the type field has been touched and has an error, display the error message */}
        {formik.touched.type && formik.errors.type ? (
          <div className="YupValidation">{formik.errors.type}</div>
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
            <option value="town1">Town 1</option>
          </select>
        </div>
        {/* If the town field has been touched and has an error, display the error message */}
        {formik.touched.town && formik.errors.town ? (
          <div className="YupValidation">{formik.errors.town}</div>
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
            <option value="category1">Category 1</option>
          </select>
        </div>
        {/* If the category field has been touched and has an error, display the error message */}
        {formik.touched.category && formik.errors.category ? (
          <div className="YupValidation">{formik.errors.category}</div>
        ) : null}
        {/* Submit form button */}
        <Submit />
      </form>
    </div>
  );
}
