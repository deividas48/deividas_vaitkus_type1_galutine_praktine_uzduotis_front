// src/pages/PageUsrSet.jsx

/* eslint-disable no-console */
import React, { useContext } from 'react';
import { AuthContext } from '../components/context/authContext';
import SetUserName from '../components/settings/setUser/SetUserName';
import SetUserEmail from '../components/settings/setUser/SetUserEmail';
import SetUserPassword from '../components/settings/setUser/SetUserPassword';

function PageUsrSet() {
  const { userDetails, loading } = useContext(AuthContext);

  if (loading) {
    return null; // Or a loading spinner
  }

  // Ensure userDetails is loaded before trying to render the form
  if (!userDetails) {
    return (
      <main className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
        <p>No user logged in or failed to fetch user data</p>
      </main>
    );
  }

  return (
    <main className="bg-white rounded-lg mt-4 p-4">
      <h2 className="title1 text-center mb-4 titleOfForm">User settings</h2>
      <div className="">
        <div className="gray-line" />
        <div className="gray-line">
          <p className="pairs mb-4">
            <span className="pairs_label_full pairs_label_full_register font-bold">
              ID:
            </span>
            {' '}
            <span className="">{userDetails.id}</span>
          </p>
        </div>
        <div className="gray-line">
          <SetUserName />
        </div>
        <div className="gray-line">
          <SetUserEmail />
        </div>
        <div className="gray-line">
          <SetUserPassword />
        </div>
      </div>
    </main>
  );
}

export default PageUsrSet;
