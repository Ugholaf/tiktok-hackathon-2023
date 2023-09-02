import Footer from "./Footer/Footer";
import Navbar from "./navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-200 w-full">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
