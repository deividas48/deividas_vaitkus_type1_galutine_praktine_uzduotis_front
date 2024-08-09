import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/Forms.css';
import '../styles/PageRegister.css';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('• Name is required'),
  email: Yup.string().email('• Invalid email').required('• Email is required'),
  password: Yup.string().required('• Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], '• Passwords must match')
    .required('• Password confirmation is required'),
});

function PageRegister() {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/register',
        values
      );
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
      <h1 className="titleOfForm">Register</h1>
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

export default PageRegister;
