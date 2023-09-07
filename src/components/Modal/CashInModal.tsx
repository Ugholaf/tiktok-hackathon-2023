import { useState } from "react";
import Modal from "./Modal";

interface CashInModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenPaypal: (open: boolean) => void;
}

const CashInModal: React.FC<CashInModalProps> = ({
  open,
  setOpen,
  setOpenPaypal,
}) => {
  const [selectedOption, setSelectedOption] = useState("paypal");

  const handleClose = () => {
    setSelectedOption("paypal");
    setOpen(false);
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (selectedOption === "paypal") {
      setOpenPaypal(true);
    }
    setSelectedOption("");
  };

  const bodyContent = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between border-b-2 border-neutral-300">
        <div className="flex flex-row gap-5 mb-4">
          <img src="/assets/icons/paypal.svg" alt="paypal icon" />
          <p className="text-2xl">Paypal</p>
        </div>
        <div>
          <input
            type="radio"
            value="paypal"
            name="paypal"
            onChange={handleChangeOption}
            checked={selectedOption === "paypal"}
            className="mb-4 scale-150 accent-red-500"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between border-b-2 border-neutral-300">
        <div className="flex flex-row gap-5 mb-4">
          <img src="/assets/icons/localBank.svg" alt="local bank icon" />
          <p className="text-2xl">Local Bank</p>
        </div>
        <div>
          <input
            type="radio"
            value="localBank"
            name="localBank"
            onChange={handleChangeOption}
            checked={selectedOption === "localBank"}
            className="mb-4 scale-150 accent-red-500"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between border-b-2 border-neutral-300">
        <div className="flex flex-row gap-5 mb-4">
          <img src="/assets/icons/creditCard.svg" alt="credit card icon" />
          <p className="text-2xl">Credit Card</p>
        </div>
        <div>
          <input
            type="radio"
            value="creditCard"
            name="creditCard"
            onChange={handleChangeOption}
            checked={selectedOption === "creditCard"}
            className="mb-4 scale-150 accent-red-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Cash In"
      body={bodyContent}
      actionLabel="Next"
    />
  );
};

export default CashInModal;
