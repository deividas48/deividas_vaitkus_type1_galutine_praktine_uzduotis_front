// FiltersLayoutBasePages.jsx
// #CreateFiltersLayoutBasePages

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import '../../styles/Forms.css';

const FilterSchema = Yup.object().shape({
  minPrice: Yup.number().min(
    0,
    'Minimum price must be greater than or equal to 0',
  ),
  maxPrice: Yup.number().min(
    0,
    'Maximum price must be greater than or equal to 0',
  ),
  town: Yup.string(),
  type: Yup.string(),
  seller: Yup.string(),
});

function FiltersLayoutBasePages({ onFilterChange }) {
  // Function to handle the price input onBlur event
  const handlePriceBlur = (event, setFieldValue) => {
    const { name, value } = event.target;
    // Parse the input value to a float
    const floatValue = parseFloat(value);
    if (!Number.isNaN(floatValue)) {
      // Set the field value to a fixed two decimal places
      setFieldValue(name, floatValue.toFixed(2));
    }
  };

  return (
    <Formik
      initialValues={{
        minPrice: '',
        maxPrice: '',
        town: '',
        type: '',
        seller: '',
      }}
      validationSchema={FilterSchema}
      onSubmit={(values, { setSubmitting }) => {
        // console.log('Form values:', values); // Log form values
        onFilterChange(values); // setBaseFilters with 'values'
        setSubmitting(false);
      }}
    >
      {({
        isSubmitting, setFieldValue, handleChange, handleBlur,
      }) => (
        <Form className="">
          <div className="filter-field">
            <label htmlFor="minPrice" className="pairs_label_full">
              Min Price
            </label>
            <Field
              type="number"
              name="minPrice"
              className="pairs_input_full w-24"
              onChange={handleChange}
              onBlur={(e) => {
                handlePriceBlur(e, setFieldValue);
                handleBlur(e);
              }}
            />
            <ErrorMessage name="minPrice" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="maxPrice">Max Price</label>
            <Field
              type="number"
              name="maxPrice"
              className="pairs_input_full w-24"
              onChange={handleChange}
              onBlur={(e) => {
                handlePriceBlur(e, setFieldValue);
                handleBlur(e);
              }}
            />
            <ErrorMessage name="maxPrice" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="town">Town</label>
            <Field
              type="text"
              name="town"
              className="pairs_input_full w-full"
            />
            <ErrorMessage name="town" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="type">Type</label>
            <Field
              type="text"
              name="type"
              className="pairs_input_full w-full"
            />
            <ErrorMessage name="type" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="seller">Seller</label>
            <Field
              type="text"
              name="seller"
              className="pairs_input_full w-full"
            />
            <ErrorMessage name="seller" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Apply Filters
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FiltersLayoutBasePages;
