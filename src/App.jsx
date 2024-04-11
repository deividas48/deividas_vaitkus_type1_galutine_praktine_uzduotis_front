import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import TownsPage from './pages/TownsPage';
import TownPage from './pages/TownPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import AddAdPage from './pages/AddAdPage';
import UserPage from './pages/UserPage';
import SingleAdPage from './pages/SingleAdPage';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/towns" element={<TownsPage />} />
        <Route path="/town/:id" element={<TownPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/skelbimas/:id" element={<SingleAdPage />} />
        <Route path="/skelbimas/sukurti" element={<AddAdPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
