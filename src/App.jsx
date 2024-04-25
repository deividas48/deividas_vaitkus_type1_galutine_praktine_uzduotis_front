import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import TownsPage from './pages/TownsPage';
import TownPage from './pages/TownPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import AddAdPage from './pages/AddAdPage';
import UserPage from './pages/UserPage';
import SingleAdPage from './pages/SingleAdPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className="container">
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/towns" element={<TownsPage />} />
        <Route path="/town/:id" element={<TownPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/skelbimas/:id" element={<SingleAdPage />} />
        <Route path="/skelbimas/sukurti" element={<AddAdPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
