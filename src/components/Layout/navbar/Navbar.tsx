import { useState, useEffect } from "react";
import Logo from "./Logo";
import { useIsLoggedIn } from "../../../hook/useIsLoggedIn";
import { onLogout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AccountType, useMeQuery } from "../../../generated/graphql";

const tabs: string[] = ["Home", "Transaction", "Roadmap"];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const pathname = location.pathname;

  const [activeTab, setActiveTab] = useState<string>("Home");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    // Determine the active tab based on the pathname
    if (pathname === "/") {
      setActiveTab("Home");
    } else if (pathname === "/transaction") {
      setActiveTab("Transaction");
    } else if (pathname === "/roadmap") {
      setActiveTab("Roadmap");
    } else {
      setActiveTab(
        pathname.substring(1).charAt(0).toUpperCase() + pathname.slice(2)
      );
    }
  }, [pathname]);

  const { data: meData, error } = useMeQuery();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowMenu(true);
    if (tab === "Home") {
      navigate("/");
    } else if (tab === "Transaction") {
      setActiveTab("Transaction");
      setShowMenu(true);
      navigate("/transaction");
    } else if (tab === "Roadmap") {
      setActiveTab("Roadmap");
      setShowMenu(true);
      navigate("/roadmap");
    }
  };

  const handleLogout = () => {
    dispatch(onLogout());
    navigate("/");
    location.reload();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className=" bg-white px-6 sm:px-27 md:px-32 py-4 sticky top-0 w-full z-10">
      {isLoggedIn ? (
        <div className="flex flex-row items-center justify-between gap-3">
          <img
            src="/assets/logo.svg"
            alt="Logo"
            onClick={() => navigate("/")}
            className="hover:cursor-pointer"
          />
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
              <div className="flex gap-3 items-center">
                <img
                  src="/assets/recentcontact/person.svg"
                  alt="person"
                  className="fill-red-600 w-4 h-4 "
                />
                <p className="bg-white text-red-600 py-2 ">Personal</p>
              </div>
            )}
            {meData?.me?.accountType === AccountType.BUSINESS && (
              <div className="flex gap-3 items-center">
                <img
                  src="/assets/icons/localBank.svg"
                  alt="person"
                  className="text-red-600 w-4 h-4"
                />
                <p className="bg-white text-red-600 py-2">Business</p>
              </div>
            )}
            {!error && "|"}
            {meData && <p>{meData.me.username}</p> /*Added username*/}
            <button className="bg-white py-2" onClick={handleLogout}>
              <img
                src="/assets/icons/signout.svg"
                alt="signout"
                className=" w-4 h-4"
              />{" "}
              {/*Changed from logout to the signout sign*/}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <Logo />
          {pathname === "/roadmapWithoutLogin" && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
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
              <div className="flex gap-3 items-center">
                <img
                  src="/assets/recentcontact/person.svg"
                  alt="person"
                  className="fill-red-600 w-4 h-4 "
                />
                <p className="bg-white text-red-600 py-2 ">Personal</p>
              </div>
            )}
            {meData?.me?.accountType === AccountType.BUSINESS && (
              <div className="flex gap-3 items-center">
                <img
                  src="/assets/icons/localBank.svg"
                  alt="person"
                  className="text-red-600 w-4 h-4"
                />
                <p className="bg-white text-red-600 py-2">Business</p>
              </div>
            )}

            {!error}

            <div className="flex gap-3 items-center">
              {meData && <p>{meData.me.username}</p> /*Added username*/}
              <button className="bg-white" onClick={handleLogout}>
                <img
                  src="/assets/icons/signout.svg"
                  alt="signout"
                  className=" w-4 h-4"
                />{" "}
                {/*Changed from logout to the signout sign*/}
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
