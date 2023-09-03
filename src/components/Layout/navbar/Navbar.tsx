import { useState } from "react";
import Logo from "./Logo";

const tabs: string[] = ["Home", "Transaction", "About"];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowMenu(true);  {/*Set effect to auto close menu or not or not*/}
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isLogin = true;

  return (
    <div className=" bg-white px-6 sm:px-27 md:px-32 py-4 sticky top-0 w-full z-10">
      {isLogin ? (
        <div className="flex flex-row items-center justify-between gap-3">
          <img src="/src/assets/logo.svg" alt="Logo" />

          <div className="md:hidden block flex items-center text-4xl" onClick={toggleMenu}>&#9776;</div>  {/* Hamburger Menu */}

          <ul className="hidden md:flex flex-row gap-3 items-center "> {/* Desktop Menu tabs */}
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
          <div className= "hidden md:flex flex-row gap-3 items-center"> {/* Desktop personal and name/logout */}
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

      {/* Mobile Menu Put here to that it is below the Nav bar*/}
        {showMenu && (
          <ul className="md:hidden flex flex-col gap-3 py-3 items-center">
            {tabs.map((tab) => (
              <li
                className={`cursor-pointer font-bold ${
                  tab === activeTab ? "underline decoration-red-500 underline-offset-4" : ""
                }`}
                key={tab}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </li>
            ))}
            <div className="border-b-2 border-gray-400 w-full"></div> {/* Line to separate tabs and personal/logout */}
            <div className="flex flex-row gap-3 items-center justify-between self-stretch flex-1"> 
              <div className = "flex flex-row items-center gap-2"> 
                <img src="/src/assets/recentcontact/person.svg" alt="person" className="h-4 w-4 stroke-red-500"/>
                <button className="bg-white text-red-600">Personal Account</button>
              </div>
              <button className="bg-white">Logout</button>
            </div>
          </ul>
        )}
    </div>
    
  );
};

export default Navbar;
