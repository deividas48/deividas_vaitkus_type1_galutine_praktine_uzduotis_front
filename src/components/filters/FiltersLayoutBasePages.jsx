// FiltersLayoutBasePages.jsx
// #CreateFiltersLayoutBasePages

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

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
      {({ isSubmitting }) => (
        <Form className="filter-container bg-white p-4 pb-1 rounded-lg">
          <h3 className="cssTitle">Filter Listings</h3>
          <div className="filter-field">
            <label htmlFor="minPrice">Min Price</label>
            <Field type="number" name="minPrice" />
            <ErrorMessage name="minPrice" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="maxPrice">Max Price</label>
            <Field type="number" name="maxPrice" />
            <ErrorMessage name="maxPrice" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="town">Town</label>
            <Field type="text" name="town" />
            <ErrorMessage name="town" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="type">Type</label>
            <Field type="text" name="type" />
            <ErrorMessage name="type" component="div" />
          </div>
          <div className="filter-field">
            <label htmlFor="seller">Seller</label>
            <Field type="text" name="seller" />
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
