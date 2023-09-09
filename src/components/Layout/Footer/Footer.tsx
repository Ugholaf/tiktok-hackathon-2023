import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../../../hook/useIsLoggedIn";

const Footer = () => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  return (
    <footer className="flex flex-col md:flex-row gap-0 md:gap-3 px-10 sm:px-27 md:px-32 bg-black bottom-0 w-full">
      <div className="flex flex-col items-start py-8 gap-y-2 w-full px-4">
        <h1 className="text-xl font-bold text-red-500 divide-y-4 py-4">
          Project Information
        </h1>
        <hr className=" h-1 w-full pt-4" />
        <button
          className="text-sm text-white"
          onClick={() =>
            isLoggedIn ? navigate("/roadmap") : navigate("/roadmapWithoutLogin")
          }
        >
          Roadmap
        </button>
      </div>
      <div className="flex flex-col items-start py-8 gap-y-2 w-full px-4">
        <h1 className="text-xl font-bold text-red-500 divide-y-4 py-4">Link</h1>
        <hr className=" h-1 w-full pt-4" />
        <button className="text-sm text-white" onClick={() => navigate("/")}>
          Home
        </button>
        <button
          className="text-sm text-white"
          onClick={() => navigate("/transaction")}
        >
          Transactions
        </button>
      </div>
      <div className="flex flex-col items-start py-14 gap-y-2 px-4">
        <p className="text-sm text-white">Singapore</p>
      </div>
    </footer>
  );
};

export default Footer;
