import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Layout = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-grey">
      <Navbar />
      <main className={`pl-0 mx-auto`}>
        <Outlet  />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;