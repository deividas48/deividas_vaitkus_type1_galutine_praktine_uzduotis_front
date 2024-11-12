// src/components/filters/FiltersLayoutBasePages.jsx

// FiltersLayoutBasePages.jsx
// #CreateFiltersLayoutBasePages

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/Forms.css';
import '../../styles/FiltersLayoutBasePages.css';
import BtnBasic from '../buttons/BtnBasic';
import IconSearch from '../icons/IconSearch';

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

// - 'onFilterChange' is from PageHome.jsx
// - 'townsOptionsListFetch' is from PageHome.jsx
function FiltersLayoutBasePages({
  onFilterChange, // From LayoutBasePages.jsx
  townsOptionsListFetch, // #townsOptionsInput
  usersOptionsListFetch, // #usersOptionsInput
  uSMinPrice, // From LayoutBasePages.jsx
  uSMaxPrice, // From LayoutBasePages.jsx
  uSTown, // From LayoutBasePages.jsx
  uSType, // From LayoutBasePages.jsx
  uSSeller, // From LayoutBasePages.jsx
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

  // <#ProhibitZeroValues>
  const handlePriceChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    if (parseFloat(value) < 0) {
      setFieldValue(name, '');
    } else {
      setFieldValue(name, value);
    }
  };
  // </#ProhibitZeroValues>

  return (
    <Formik
      initialValues={{
        minPrice: uSMinPrice,
        maxPrice: uSMaxPrice,
        town: uSTown,
        type: uSType,
        seller: uSSeller,
      }}
      enableReinitialize // This tells Formik to re-initialize the form values whenever the initialValues prop changes
      validationSchema={FilterSchema}
      onSubmit={(values, { setSubmitting }) => {
        onFilterChange(values); // setBaseFilters with 'values'
        setSubmitting(false);
      }}
    >
      {({
        // isSubmitting,
        setFieldValue,
        handleBlur,
      }) => (
        <Form className="">
          <div className="filter-field BSLabelSize">
            <label htmlFor="minPrice" className="pairs_label_full">
              Min Price
            </label>
            <Field
              type="number"
              name="minPrice"
              className="pairs_input_full w-24 inputSize1"
              onChange={(e) => handlePriceChange(e, setFieldValue)} // #ProhibitZeroValues
              onBlur={(e) => {
                handlePriceBlur(e, setFieldValue);
                handleBlur(e);
              }}
            />
            <ErrorMessage name="minPrice" component="div" />
          </div>

          <div className="filter-field BSLabelSize">
            <label htmlFor="maxPrice">Max Price</label>
            <Field
              type="number"
              name="maxPrice"
              className="pairs_input_full w-24 inputSize1"
              onChange={(e) => handlePriceChange(e, setFieldValue)} // #ProhibitZeroValues
              onBlur={(e) => {
                handlePriceBlur(e, setFieldValue);
                handleBlur(e);
              }}
            />
            <ErrorMessage name="maxPrice" component="div" />
          </div>

          <div className="filter-field BSLabelSize">
            <label htmlFor="town">Town</label>
            <Field
              as="select"
              name="town"
              className="pairs_input_full w-full inputSize1"
            >
              {/* Bring all TownsOptionsListFetch.jsx file */}
              <option value="" label="Select town" />
              {/* #townsOptionsInput */}
              {townsOptionsListFetch}
            </Field>
            <ErrorMessage name="town" component="div" />
          </div>

          <div className="filter-field BSLabelSize">
            <label htmlFor="type">Type</label>
            <Field
              as="select"
              name="type"
              className="pairs_input_full w-full inputSize1"
            >
              <option value="" label="Select type" />
              <option value="sell" label="Sell" />
              <option value="buy" label="Buy" />
              <option value="rent" label="Rent" />
            </Field>
            <ErrorMessage name="type" component="div" />
          </div>

          <div className="filter-field BSLabelSize">
            <label htmlFor="seller">Seller</label>
            <Field
              as="select"
              name="seller"
              className="pairs_input_full w-full mb-4 inputSize1"
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
