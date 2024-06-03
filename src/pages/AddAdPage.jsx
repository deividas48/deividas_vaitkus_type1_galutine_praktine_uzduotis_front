import { isNaN, useFormik } from 'formik';
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
      >
        <div className="pairs">
          <label htmlFor="title" className="pairs_label_full">
            {/* Make label name from already created variables. */}
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            required // Ensures the field must be filled out
            minLength={10} // Minimum length for adequate description
            maxLength={100} // Maximum length to prevent overly verbose titles
            placeholder="Enter a title for your item, e.g., 'Purple iPhone 13'"
            // aria-describedby="titleHelp" // ID for an element containing additional description
            autoComplete="on" // Consider "on" if previous titles should be suggested
            className="pairs_input_full"
          />
          {/* <small id="titleHelp" className="form-text text-muted">
            Title should be between 10 to 100 characters.
          </small> */}
        </div>
        <div className="pairs">
          <label htmlFor="description" className="pairs_label_full">
            {/* Make label name from already created variables. */}
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            required // Ensures the field must be filled out
            maxLength={800}
            placeholder="Provide a detailed description of your item..."
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_textarea_full pairs_input_full"
          />
        </div>
        <div className="pairs">
          <label htmlFor="price" className="pairs_label_full">
            {/* Make label name from already created variables. */}
            Price (€):
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={handlePriceBlur}
            value={formik.values.price}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            min="0" // Ensures the price cannot be negative
            step="1.00" // Allows for two decimal places, useful for prices
            required // Ensures the field must be filled out
            placeholder="Enter the price in Euro"
            // width 10 proc.
            className="width_20proc pairs_input_notFull"
          />
          <label htmlFor="phone" className="pairs_label_secoundHalf ml-3">
            {/* Make label name from already created variables. */}
            Phone:
          </label>
          <input
            id="phone"
            name="phone"
            type="tell"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="pairs_input_notFull pairs_input_secoundHalf"
          />
        </div>
        <div className="w-1/3" />
        <div className="pairs">
          <label htmlFor="type" className="pairs_label_full">
            {/* Make label name from already created variables. */}
            Type:
          </label>
          <input
            id="type"
            name="type"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.type}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          />
        </div>
        <div className="pairs">
          <label htmlFor="town" className="pairs_label_full">
            {/* Make label name from already created variables. */}
            Town:
          </label>
          <input
            id="town"
            name="town"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.town}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          />
        </div>
        <div className="pairs">
          <label htmlFor="category" className="pairs_label_full">
            {/* Make label name from already created variables. */}
            Category:
          </label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.category}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="pairs_input_full"
          />
        </div>
        <Submit />
      </form>
    </div>
  );
}
