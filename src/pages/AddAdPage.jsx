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
        .matches(/^[0-9]+$/, '• Phone number must contain only digits')
        .min(10, '• Phone number must be at least 10 digits')
        .max(15, '• Phone number must be less than 15 digits')
        .required('• Phone number is required'),
      type: Yup.string().required('• Type is required'),
      town: Yup.string().required('• Town is required'),
      category: Yup.string().required('• Category is required'),
    }),
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
    <div className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col py-4 w-full"
        noValidate // Disable the browser's HTML5 native validation
      >
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
          {formik.touched.title && formik.errors.title ? (
            <div className="YupValidation">{formik.errors.title}</div>
          ) : null}
        </div>
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
          {formik.touched.description && formik.errors.description ? (
            <div className="YupValidation">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="pairs">
          <div className="margin" />
          <label htmlFor="price" className="pairs_label_full label_price">
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
            required // Ensures the field must be filled out
            placeholder="Enter the price in Euro"
            // width 10 proc.
            className="pairs_input_firstHalf_width_12_5proc pairs_input_notFull "
          />
          <label
            htmlFor="phone"
            className="pairs_label_secoundHalf pairs_label_secHalf_width_12_5proc ml-3 pairs_label_full_md"
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
            className="pairs_input_notFull pairs_input_secHalf_width_25proc"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="YupValidation">{formik.errors.price}</div>
          ) : null}
          {formik.touched.phone && formik.errors.phone ? (
            <div className="YupValidation">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="w-1/3" />
        <div className="pairs">
          <label htmlFor="type" className="pairs_label_full">
            Type:
          </label>
          <input
            id="type"
            name="type"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.type}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          />
          {formik.touched.type && formik.errors.type ? (
            <div className="YupValidation">{formik.errors.type}</div>
          ) : null}
        </div>
        <div className="pairs">
          <label htmlFor="town" className="pairs_label_full">
            Town:
          </label>
          <input
            id="town"
            name="town"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.town}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          />
          {formik.touched.town && formik.errors.town ? (
            <div className="YupValidation">{formik.errors.town}</div>
          ) : null}
        </div>
        <div className="pairs">
          <label htmlFor="category" className="pairs_label_full">
            Category:
          </label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // For triggering validation
            value={formik.values.category}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="YupValidation">{formik.errors.category}</div>
          ) : null}
        </div>
        <Submit />
      </form>
    </div>
  );
}
