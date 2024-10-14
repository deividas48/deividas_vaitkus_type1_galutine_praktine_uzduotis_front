// src/settings/setUser/SetUserPassword.jsx

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
  // Old password validation
  oldPassword: Yup.string().required('• Old Password is required'),

  // New password validation
  newPassword: Yup.string()
    .required('Please enter your new password')
    .min(8, '• Password must be at least 8 characters long')
    .matches(/[A-Z]/, '• Password must contain at least one uppercase letter')
    .matches(/[a-z]/, '• Password must contain at least one lowercase letter')
    .matches(/\d/, '• Password must contain at least one number')
    .matches(
      /[@$!%*?&#]/,
      '• Password must contain at least one special character',
    ),

  // Confirm new password validation
  confirmNewPassword: Yup.string()

    // Ensures that the 'password_confirmation' must match the value of the 'password' field
    // 'Yup.ref('password')' references the 'password' field
    .oneOf([Yup.ref('newPassword'), null], '• Passwords must match')
    .when('newPassword', {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: Yup.string().required('• Confirm New Password is required'),
    }),
});

function SetUserPassword() {
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
      toast.success('Your password has been successfully updated', {
        duration: 8000,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update the password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="items-center bg-white rounded-lg">
      <Formik
        initialValues={{
          oldPassword: '', // Old password field
          newPassword: '', // New password field
          confirmNewPassword: '', // Confirm new password field
        }}
        validationSchema={UserSettingsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col py-4 w-full form_register">
            <div>
              <p className="pairs mb-4">
                <span className="pairs_label_full pairs_label_full_register font-bold">
                  Password
                </span>{' '}
                <span className="" />
              </p>
            </div>

            {isVisible && (
              <>
                {/* Old Password */}
                <div className="pairs">
                  <label
                    htmlFor="oldPassword"
                    className="pairs_label_full pairs_label_full_register"
                  >
                    Old Password
                  </label>
                  <Field
                    type="password"
                    name="oldPassword"
                    className="pairs_input_full input_register"
                  />
                </div>
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="error_register"
                />

                {/* New Password */}
                <div className="pairs mb-4">
                  <label
                    htmlFor="newPassword"
                    className="pairs_label_full pairs_label_full_register"
                  >
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    className="pairs_input_full input_register"
                  />
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="error_register"
                />

                {/* Confirm New Password */}
                <div className="pairs mb-4">
                  <label
                    htmlFor="confirmNewPassword"
                    className="pairs_label_full pairs_label_full_register"
                  >
                    Confirm New Password
                  </label>
                  <Field
                    type="password"
                    name="confirmNewPassword"
                    className="pairs_input_full input_register"
                  />
                </div>
                <ErrorMessage
                  name="confirmNewPassword"
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
                  {isVisible ? 'Cancel' : 'Edit password'}
                </button>
                {isVisible && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Submit form"
                  >
                    <div className="bg-custom-primary-color text-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out hover:bg-custom-color-secondary">
                      Update Password
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

export default SetUserPassword;
