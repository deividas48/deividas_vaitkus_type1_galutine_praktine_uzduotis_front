// src/settings/setUser/SetUserName.jsx

/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../../styles/Forms.css';
import '../../../styles/PageRegister.css';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';

const UserSettingsSchema = Yup.object().shape({
  // Name validation
  name: Yup.string()
    .required('Please enter your new name')
    .min(3, '• Name must be at least 3 characters long')
    .max(25, '• Name cannot exceed 25 characters')
    .matches(/^[a-zA-Z\s]+$/, '• Name can only contain letters and spaces'),

  // Password validation
  password: Yup.string().required('• Enter the password to edit your name'),
});

function SetUserName() {
  // Initialize the navigate function
  const { userDetails } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false); // State for the edit button

  // Toggle the state when button is clicked
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/user/${userDetails.id}`,
        // values = initialValues
        values,
      );
      console.log('User updated:', response.data);
      // Redirect to the previous page
      toast.success('Your name has been successfully updated', {
        duration: 8000,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update name. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="items-center bg-white rounded-lg">
      <Formik
        initialValues={{
          name: userDetails.name,
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
                  Name:
                </span>
                {' '}
                <span className="">{userDetails.name}</span>
              </p>
            </div>

            {isVisible && (
              <>
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
                  {isVisible ? 'Cancel' : 'Edit name'}
                </button>
                {isVisible && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Submit form"
                  >
                    <div className="bg-custom-primary-color text-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out hover:bg-custom-color-secondary">
                      Update Name
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

export default SetUserName;
