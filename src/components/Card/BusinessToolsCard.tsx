import ApiIntegrationModal from "../Modal/ApiIntegrationModal";
import { useState } from "react";
import ApiKeysListModal from "../Modal/ApiKeysListModal";

const BusinessToolsCard = () => {
  const [openApiIntegration, setOpenApiIntegration] = useState(false);
  const [openApiKeysList, setOpenApiKeysList] = useState(false);

  return (
    <>
      <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 gap-8 self-stretch items-center w-full shadow-md bg-white">
        <p className="text-2xl font-bold border-b-2 border-red-500">
          Business Tools
        </p>

        <div className="flex justify-center items-center content-center gap-y-1 space-x-10 lg:space-x-5 xl:justify-between xl:px-5 self-stretch flex-wrap">
          <button
            className="col-span-1 flex flex-col items-center gap-2 justify-start"
            onClick={() => {
              setOpenApiIntegration(true);
            }}
          >
            <img src="public/assets/recentcontact/person.svg" alt="person" />
            <p className="text-base font-bold">Generate API Key</p>
          </button>

          <button
            className="col-span-1 flex flex-col items-center gap-2 justify-start"
            onClick={() => {
              setOpenApiKeysList(true);
            }}
          >
            <div className="col-span-1 flex flex-col items-center gap-2 justify-start">
              <img src="public/assets/recentcontact/person.svg" alt="person" />
              <p className="text-base font-bold">Manage API Keys</p>
            </div>
          </button>
        </div>
      </div>
      <ApiIntegrationModal
        open={openApiIntegration}
        setOpen={setOpenApiIntegration}
      />
      <ApiKeysListModal open={openApiKeysList} setOpen={setOpenApiKeysList} />
    </>
  );
};

export default BusinessToolsCard;
