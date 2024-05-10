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
        {[
          'title',
          'description',
          'price',
          'phone',
          'type',
          'town',
          'category',
        ].map((field) => (
          // key is required for React to keep track of the elements
          <div key={field} className="custom_form_pairs">
            <label htmlFor={field}>
              {/* Make label name from already created variables. */}
              {field.charAt(0).toUpperCase() + field.slice(1)}
              :
            </label>
            <input
              id={field}
              name={field}
              type="text"
              onChange={formik.handleChange}
              value={formik.values[field]}
              // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}
        <Submit />
      </form>
    </div>
  );
}
