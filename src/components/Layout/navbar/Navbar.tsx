import { useState } from "react";
import Logo from "./Logo";

interface NavbarProps {
  isLogin: boolean;
}

const tabs: string[] = ["Home", "Transaction", "About"];

const Navbar: React.FC<NavbarProps> = ({ isLogin }) => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className=" bg-white w-full h-full">
      {isLogin ? (
        <div className="flex flex-row items-center justify-between gap-3">
          <Logo />
          <ul className="flex flex-row gap-3 items-center">
            {tabs.map((tab) => (
              <li
                className={`cursor-pointer font-bold ${
                  tab === activeTab
                    ? "underline decoration-red-500 underline-offset-4"
                    : ""
                }`}
                key={tab}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div>
            <button className="bg-white text-red-600 py-2 px-4">
              Personal
            </button>
            {"|"}
            <button className="bg-white py-2 px-4">Logout</button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button className="bg-white text-red-600 py-2 px-4 rounded border border-red-600">
            Login
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded">
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
