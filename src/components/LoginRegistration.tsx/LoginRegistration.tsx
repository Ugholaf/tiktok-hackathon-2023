import { useState } from "react";
import RegistrationForm from "../Form/RegistrationForm";
import LoginForm from "../Form/LoginForm";

const LoginRegistration = () => {
  const tabs = ["Registration", "Login"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="text-sm font-medium gap-10 py-10 px-12">
      <div className="grid grid-cols-2">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${
              activeTab === tab
                ? "border-b-2 border-red-500 py-2"
                : "border-b-2 border-gray-500 py-2"
            } cursor-pointer`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}{" "}
      </div>

      <div>
        {activeTab === tabs[0] && <RegistrationForm />}
        {activeTab === tabs[1] && <LoginForm />}
      </div>
    </div>
  );
};

export default LoginRegistration;
