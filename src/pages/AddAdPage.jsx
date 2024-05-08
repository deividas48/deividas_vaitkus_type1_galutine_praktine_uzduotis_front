import { useFormik } from 'formik';

export default function AddAdPage() {
  const formik = useFormik({
    initialValues: {
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
    <div className="flex flex-col items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col rounded-lg p-4 shadow-md custom_form items-center"
      >
        <div className="flex w-full">
          <label htmlFor="title" className="w-1/2 text-right mr-1">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            placeholder="Title"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="description" className="w-1/2 text-right mr-1">Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Description"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="price" className="w-1/2 text-right mr-1">Price:</label>
          <input
            id="price"
            name="price"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.price}
            placeholder="Price"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="phone" className="w-1/2 text-right mr-1">Phone:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
            placeholder="Phone"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="type" className="w-1/2 text-right mr-1">Type:</label>
          <input
            id="type"
            name="type"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.type}
            placeholder="Type"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="town" className="w-1/2 text-right mr-1">Town:</label>
          <input
            id="town"
            name="town"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.town}
            placeholder="Town"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="category" className="w-1/2 text-right mr-1">Category:</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.category}
            placeholder="Category"
            className="w-1/2"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
