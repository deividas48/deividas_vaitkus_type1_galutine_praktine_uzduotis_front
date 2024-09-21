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
import { SearchProvider } from './components/context/SearchContext';
import PageUsrSet from './pages/PageUsrSet';
import RoutePublic from './components/routing/RoutePublic';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
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

            <Route
              path="/login"
              element={
                <RoutePublic>
                  <PageLogIn />
                </RoutePublic>
              } // *Redirect else if it's only for public
            />

            <Route
              path="/register"
              element={
                <RoutePublic>
                  <PageRegister />
                </RoutePublic>
              } // *Redirect else if it's only for public
            />
            <Route path="/skelbimas/:id" element={<PageSingleListing />} />

            <Route
              path="/skelbimas/sukurti"
              element={
                <PrivateRoute>
                  <PageAddListing />
                </PrivateRoute>
              } // *Redirect else if it's only for private users
            />

            <Route
              path="/userSettings"
              element={
                <PrivateRoute>
                  <PageUsrSet />
                </PrivateRoute>
              } // *Redirect else if it's only for private users
            />

            <Route path="/user/:id" element={<PageUser />} />
            <Route path="*" element={<PageError />} />
          </Routes>
        </div>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
