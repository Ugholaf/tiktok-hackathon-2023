import { useState } from "react";
import Logo from "./Logo";
import { useIsLoggedIn } from "../../../hook/useIsLoggedIn";
import { onLogout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AccountType, useMeQuery } from "../../../generated/graphql";

const tabs: string[] = ["Home", "Transaction", "About"];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  const [activeTab, setActiveTab] = useState<string>("Home");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { data: meData, error } = useMeQuery();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowMenu(true);
    {
      /*Set effect to auto close menu or not or not*/
    }
  };

  const handleLogout = () => {
    dispatch(onLogout());
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className=" bg-white px-6 sm:px-27 md:px-32 py-4 sticky top-0 w-full z-10">
      {isLoggedIn ? (
        <div className="flex flex-row items-center justify-between gap-3">
          <img src="/src/assets/logo.svg" alt="Logo" />
          <div
            className="md:hidden flex items-center text-4xl"
            onClick={toggleMenu}
          >
            &#9776;
          </div>{" "}
          {/* Hamburger Menu */}
          <ul className="hidden md:flex flex-row gap-3 items-center ">
            {" "}
            {/* Desktop Menu tabs */}
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
          <div className="hidden md:flex flex-row gap-3 items-center">
            {" "}
            {/* Desktop personal and name/logout */}
            {meData?.me?.accountType === AccountType.INDIVIDUAL && (
              <p className="bg-white text-red-600 py-2 ">Personal</p>
            )}
            {meData?.me?.accountType === AccountType.BUSINESS && (
              <p className="bg-white text-red-600 py-2">Business</p>
            )}
            {!error && "|"}
            <button className="bg-white py-2" onClick={handleLogout}>
              Logout
            </button>
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
          <div className="border-b-2 border-gray-400 w-full"></div>{" "}
          {/* Line to separate tabs and personal/logout */}
          <div className="flex flex-row gap-3 items-center justify-between self-stretch flex-1">
            {meData?.me?.accountType === AccountType.INDIVIDUAL && (
              <p className="bg-white text-red-600 py-2 ">Personal</p>
            )}
            {meData?.me?.accountType === AccountType.BUSINESS && (
              <p className="bg-white text-red-600 py-2 ">Business</p>
            )}
            <button className="bg-white">Logout</button>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
