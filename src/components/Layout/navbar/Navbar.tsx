import { useState } from "react";
import Logo from "./Logo";

const tabs: string[] = ["Home", "Transaction", "About"];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const isLogin = false;

  return (
    <div className=" bg-white px-32 py-4 fixed w-full z-10">
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
        <Logo />
      )}
    </div>
  );
};

export default Navbar;
