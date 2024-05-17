import { useFormik } from 'formik';
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

  return (
    <div className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col py-4 w-full"
      >
        <div className="custom_form_pairs">
          <label htmlFor="title">
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
          />
          {/* <small id="titleHelp" className="form-text text-muted">
            Title should be between 10 to 100 characters.
          </small> */}
        </div>
        <div className="custom_form_pairs">
          <label htmlFor="description">
            {/* Make label name from already created variables. */}
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        </div>
        <div className="custom_form_pairs">
          <label htmlFor="price">
            {/* Make label name from already created variables. */}
            Price:
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        </div>
        <div className="custom_form_pairs">
          <label htmlFor="phone">
            {/* Make label name from already created variables. */}
            Phone:
          </label>
          <input
            id="phone"
            name="phone"
            type="tell"
            onChange={formik.handleChange}
            value={formik.values.phone}
            // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        </div>
        <div className="custom_form_pairs">
          <label htmlFor="type">
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
          />
        </div>
        <div className="custom_form_pairs">
          <label htmlFor="town">
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
          />
        </div>
        <div className="custom_form_pairs">
          <label htmlFor="category">
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
          />
        </div>
        <Submit />
      </form>
    </div>
  );
}
