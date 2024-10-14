// src/settings/setUser/SetUserEmail.jsx

/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../../styles/Forms.css';
import '../../../styles/PageRegister.css';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';
import { baseUrl } from '../../../config/config';

const UserSettingsSchema = Yup.object().shape({
  // Email validation
  email: Yup.string()
    .email('• Invalid email')
    .required('Please enter your new email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '• Email must be a valid format',
    ),

  // Password validation
  password: Yup.string().required('• Enter the password to edit your email'),
});

function SetUserEmail() {
  const { userDetails } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false); // State for the edit button

  // Toggle the state when button is clicked
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/auth/user/${userDetails.id}`,
        // values = initialValues
        values,
      );
      console.log('User updated:', response.data);
      // Redirect to the previous page
      toast.success('Your email has been successfully updated', {
        duration: 8000,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="items-center bg-white rounded-lg">
      <Formik
        initialValues={{
          email: userDetails.email,
          password: '', // Password field
        }}
        validationSchema={UserSettingsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col py-4 w-full form_register">
            <div>
              <p className="pairs mb-4">
                <span className="pairs_label_full pairs_label_full_register font-bold">
                  Email:
                </span>{' '}
                <span className="">{userDetails.email}</span>
              </p>
            </div>

            {isVisible && (
              <>
                {/* Email */}
                <div className="pairs">
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
              </>
            )}

            {/* Submit button */}
            <div className="pairs mb-0">
              <div className="pairs_label_full pairs_label_full_register" />
              <div className="pairs_input_full input_register fakeInputRemoveStyle justify-end">
                {/* Edit button */}
                <button className="mr-4" type="button" onClick={toggleDiv}>
                  {isVisible ? 'Cancel' : 'Edit email'}
                </button>
                {isVisible && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Submit form"
                  >
                    <div className="bg-custom-primary-color text-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out hover:bg-custom-color-secondary">
                      Update Email
                    </div>
                  </button>
                )}
              </div>
              {/* </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default SetUserEmail;
