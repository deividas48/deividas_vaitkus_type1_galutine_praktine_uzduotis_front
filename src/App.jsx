import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
// import PageMain from './pages/PageMain';
import PageHome from './pages/PageHome';
import PageTowns from './pages/PageTowns';
import PageTown from './pages/PageTown';
import PageLogIn from './pages/PageLogIn';
import PageRegister from './pages/PageRegister';
import PageAddListing from './pages/PageAddListing';
import PageUser from './pages/PageUser';
import PageSingleListing from './pages/PageSingleListing';
import PageError from './pages/PageError';
import PageListingsCategory from './pages/PageListingsCategory';

function App() {
  return (
    <div className="container">
      <Header />
      <Toaster />
      {/* Create the routes - the links to the pages */}
      <Routes>
        {/* <Route path="/" element={<PageMain />} /> */}
        <Route path="/" element={<PageHome />} />
        <Route path="/towns" element={<PageTowns />} />
        <Route path="/town/:id" element={<PageTown />} />
        <Route path="/login" element={<PageLogIn />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/skelbimas/:id" element={<PageSingleListing />} />
        <Route path="/skelbimas/sukurti" element={<PageAddListing />} />
        <Route path="/user/:id" element={<PageUser />} />
        <Route path="/categories/:id" element={<PageListingsCategory />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
