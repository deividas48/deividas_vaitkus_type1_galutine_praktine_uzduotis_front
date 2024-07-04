import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import TownsPage from './pages/TownsPage';
import TownPage from './pages/TownPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import AddListingPage from './pages/AddListingPage';
import UserPage from './pages/UserPage';
import SingleListingPage from './pages/SingleListingPage';
import ErrorPage from './pages/ErrorPage';
import PageListingsCategory from './pages/PageListingsCategory';

function App() {
  return (
    <div className="container">
      <Header />
      <Toaster />
      {/* Create the routes - the links to the pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/towns" element={<TownsPage />} />
        <Route path="/town/:id" element={<TownPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/skelbimas/:id" element={<SingleListingPage />} />
        <Route path="/skelbimas/sukurti" element={<AddListingPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/categories/:id" element={<PageListingsCategory />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
