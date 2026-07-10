import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;