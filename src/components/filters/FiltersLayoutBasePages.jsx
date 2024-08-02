// FiltersLayoutBasePages.jsx
// #CreateFiltersLayoutBasePages

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/Forms.css';
import BtnBasic from '../buttons/BtnBasic';
import IconSearch from '../icons/IconSearch';

const FilterSchema = Yup.object().shape({
  minPrice: Yup.number().min(
    0,
    'Minimum price must be greater than or equal to 0'
  ),
  maxPrice: Yup.number().min(
    0,
    'Maximum price must be greater than or equal to 0'
  ),
  town: Yup.string(),
  type: Yup.string(),
  seller: Yup.string(),
});

// - 'onFilterChange' is from PageHome.jsx
// - 'townsOptionsListFetch' is from PageHome.jsx
function FiltersLayoutBasePages({
  onFilterChange,
  townsOptionsListFetch, // #townsOptionsInput
  usersOptionsListFetch, // #usersOptionsInput
}) {
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
        // isSubmitting,
        setFieldValue,
        handleChange,
        handleBlur,
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
            <Field as="select" name="town" className="pairs_input_full w-full">
              {/* Bring all TownsOptionsListFetch.jsx file */}
              <option value="" label="Select town" />
              {/* #townsOptionsInput */}
              {townsOptionsListFetch}
            </Field>
            <ErrorMessage name="town" component="div" />
          </div>

          <div className="filter-field">
            <label htmlFor="type">Type</label>
            <Field as="select" name="type" className="pairs_input_full w-full">
              <option value="" label="Select type" />
              <option value="sell" label="Sell" />
              <option value="buy" label="Buy" />
              <option value="rent" label="Rent" />
            </Field>
            <ErrorMessage name="type" component="div" />
          </div>

          <div className="filter-field">
            <label htmlFor="seller">Seller</label>
            <Field
              as="select"
              name="seller"
              className="pairs_input_full w-full mb-4"
            >
              {/* Bring all UsersOptionsListFetch.jsx file */}
              <option value="" label="Select user" />
              {/* #usersOptionsInput */}
              {usersOptionsListFetch}
            </Field>
            <ErrorMessage name="seller" component="div" />
          </div>

          <div className="flex justify-center">
            <BtnBasic
              BtnBasicText="Apply Filters"
              additionalClasses="w-full py-4"
              BtnBasicIcon={<IconSearch />}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FiltersLayoutBasePages;
