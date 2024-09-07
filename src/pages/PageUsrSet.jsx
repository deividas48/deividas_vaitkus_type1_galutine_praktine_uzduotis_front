/* eslint-disable no-console */
import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/Forms.css';
import '../styles/PageRegister.css';
import { useNavigate } from 'react-router-dom'; // +#afterRegSubmitToPreviosPage
import toast from 'react-hot-toast';

const RegisterSchema = Yup.object().shape({
  // name
  name: Yup.string()
    .min(3, '• Name must be at least 3 characters long')
    .max(25, '• Name cannot exceed 25 characters')
    .matches(/^[a-zA-Z\s]+$/, '• Name can only contain letters and spaces')
    .required('• Name is required'),

  // email
  email: Yup.string()
    .email('• Invalid email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '• Email must be a valid format',
    )
    .required('• Email is required'),

  // password
  password: Yup.string()
    .required('• Password is required')
    .min(8, '• Password must be at least 8 characters long')
    .matches(/[A-Z]/, '• Password must contain at least one uppercase letter')
    .matches(/[a-z]/, '• Password must contain at least one lowercase letter')
    .matches(/\d/, '• Password must contain at least one number')
    .matches(
      /[@$!%*?&#]/,
      '• Password must contain at least one special character',
    ),

  // * Password_confirmatio
  // Defining the 'password_confirmation' field as a string in the Yup schema
  password_confirmation: Yup.string()

    // Ensures that the 'password_confirmation' must match the value of the 'password' field
    // 'Yup.ref('password')' references the 'password' field
    .oneOf([Yup.ref('password'), null], '• Passwords must match')

    // Ensures that the 'password_confirmation' field is required
    // The custom message '• Password confirmation is required' is displayed if the field is empty
    .required('• Password confirmation is required'),
});

function PageUsrSet() {
  // Initialize the navigate function
  const navigate = useNavigate(); // +#afterRegSubmitToPreviosPage

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/register',
        values,
      );
      console.log('User registered:', response.data);
      // Redirect to the previous page
      navigate(-1); // #afterRegSubmitToPreviosPage
      toast.success('Your account has been successfully created', {
        duration: 8000,
      });
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
      <h2 className="titleOfForm">Register</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col py-4 w-full form_register">
            {/* Name */}
            <div className="pairs mb-4">
              <label
                htmlFor="name"
                className="pairs_label_full pairs_label_full_register"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="pairs_input_full input_register"
              />
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="error_register"
            />

            {/* Email */}
            <div className="pairs mb-4">
              <label
                htmlFor="email"
                className="pairs_label_full pairs_label_full_register"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="pairs_input_full input_register"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="error_register"
            />

            {/* Password */}
            <div className="pairs mb-4">
              <label
                htmlFor="password"
                className="pairs_label_full pairs_label_full_register"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="pairs_input_full input_register"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="error_register"
            />

            {/* Password_confirmation */}
            <div className="pairs mb-4">
              <label
                htmlFor="password_confirmation"
                className="pairs_label_full pairs_label_full_register"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                name="password_confirmation"
                className="pairs_input_full input_register"
              />
            </div>
            <ErrorMessage
              name="password_confirmation"
              component="div"
              className="error_register"
            />

            {/* Submitting */}
            <div className="pairs mb-4">
              {/* <div className=" registerButtonDivSize"> */}
              <div className="pairs_label_full pairs_label_full_register" />
              <div className="pairs_input_full input_register fakeInputRemoveStyle justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Submit form"
                >
                  <div className="bg-custom-primary-color text-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out hover:bg-custom-color-secondary">
                    Register
                  </div>
                </button>
              </div>
              {/* </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default PageUsrSet;
