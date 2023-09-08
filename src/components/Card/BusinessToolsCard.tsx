import ApiIntegrationModal from "../Modal/ApiIntegrationModal";
import { useState } from "react";

const BusinessToolsCard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleApiModalOpen = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 gap-8 self-stretch items-center w-full shadow-md bg-white">
        <p className="text-2xl font-bold border-b-2 border-red-500">
          Business Tools
        </p>

        <div className="flex justify-center items-center content-center gap-y-1 space-x-10 lg:space-x-5 xl:justify-between xl:px-5 self-stretch flex-wrap">
          <button
            className="col-span-1 flex flex-col items-center gap-2 justify-start"
            onClick={handleApiModalOpen}
          >
            <img src="/assets/recentcontact/person.svg" alt="person" />
            <p className="text-base font-bold">Wallet API</p>
          </button>
          <div className="col-span-1 flex flex-col items-center gap-2 justify-start">
            <img src="/assets/recentcontact/person.svg" alt="person" />
            <p className="text-base font-bold">Business Info</p>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-2 justify-start">
            <img src="/assets/recentcontact/person.svg" alt="person" />
            <p className="text-base font-bold">Invoicing</p>
          </div>
        </div>

        <div className="flex flex-row justify-center space-x-4">
          <img src="/assets/recentcontact/viewmore.svg" alt="person" />
          <p className="text-base font-bold ">View More</p>
        </div>
      </div>
      <ApiIntegrationModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default BusinessToolsCard;
