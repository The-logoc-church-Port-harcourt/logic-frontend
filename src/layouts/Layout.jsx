import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';

const Layout = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-grey">
      {/* <Navbar welcomeRoute={location.pathname === "/welcome"} />  */}
      <main className={`pl-0 mx-auto`}>
        <Outlet  />
      </main>
    </div>
  );
};

export default Layout;