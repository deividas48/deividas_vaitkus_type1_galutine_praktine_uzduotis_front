// src/App.jsx

import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import PageHome from './pages/PageHome';
import PageListingsCategory from './pages/PageListingsCategory';
import PageTowns from './pages/PageTowns';
import PageTown from './pages/PageTown';
import PageLogIn from './pages/PageLogIn';
import PageRegister from './pages/PageRegister';
import PageAddListing from './pages/PageAddListing';
import PageUser from './pages/PageUser';
import PageSingleListing from './pages/PageSingleListing';
import PageError from './pages/PageError';
import { AuthProvider } from './components/context/authContext'; // #loginFoundation
import PrivateRoute from './components/routing/PrivateRoute';
import PageSearchListings from './pages/PageSearchListings';

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <Header />
        <Toaster />
        {/* Create the routes - the links to the pages */}
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/categories/:id" element={<PageListingsCategory />} />
          <Route path="/search" element={<PageSearchListings />} />
          <Route path="/towns" element={<PageTowns />} />
          <Route path="/town/:id" element={<PageTown />} />
          <Route path="/login" element={<PageLogIn />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/skelbimas/:id" element={<PageSingleListing />} />
          <Route
            path="/skelbimas/sukurti"
            element={
              <PrivateRoute>
                <PageAddListing />
              </PrivateRoute>
            }
          />
          <Route path="/user/:id" element={<PageUser />} />
          <Route path="*" element={<PageError />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
