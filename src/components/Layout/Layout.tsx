import Footer from "./Footer/Footer";
import Navbar from "./navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  isLogin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isLogin }) => {
  return (
    <>
      <Navbar isLogin={isLogin} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
