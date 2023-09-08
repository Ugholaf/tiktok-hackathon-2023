import { useState, useRef } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { Currency, useRequestWithdrawMutation } from "../../generated/graphql";
import { useMeQuery } from "../../generated/graphql";

interface CashOutModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CashOutModal: React.FC<CashOutModalProps> = ({ open, setOpen }) => {
  const [requestWithdraw] = useRequestWithdrawMutation();
  const checkoutRef = useRef("");
  const [modalNumber, setModalNumber] = useState(1);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const { data } = useMeQuery({
    pollInterval: 2000,
  });

  const balance = data?.me.balances.find((balance) => balance.currency === "SGD");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCheck = () => {
    const convertedAmount = Number(amount);

    if (!convertedAmount) {
      toast.error("Amount cannot be empty");
      return false;
    }
    if (!email) {
      toast.error("Email cannot be empty");
      return false;
    }
    if (selectedOption == "") {
      toast.error("Please select a cashout method");
      return false;
    }
    if (convertedAmount < 0) {
      toast.error("Amount must be greater than 0");
      return false;
    }

    if (balance === undefined) {
      toast.error("There is an error with the account");
      return false;
    } else if (balance.amount < 0) {
      toast.error("Amount must be greater than 0");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    {
      /*setOpen(false);*/
    }

    return true;
  };

  const pressback = () => {
    setAmount("");
    setSelectedOption("");
    setEmail("");
  };

  const handleSubmit = async () => {
    if (!Number(amount)) {
      toast.error("Amount cannot be empty");
      return;
    }

    if (Number(amount) < 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (selectedOption == "") {
      toast.error("Please select a cashout method");
      return;
    }

    const { data: withdrawData, errors } = await requestWithdraw({
      variables: {
        amount: parseFloat(amount),
        currency: Currency.SGD,
        paypalEmail: email,
      },
    });

    if (!withdrawData?.requestWithdraw.paypalPaymentId || errors?.length) {
      toast.error("Error requesting withdraw");
      throw new Error("Error requesting withdraw");
    }
    checkoutRef.current = withdrawData.requestWithdraw.paypalPaymentId;
    toast.success("Successfully requested withdraw");
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="flex text-xl ml-2 font-semibold justify-start">
          Amount
        </label>
        <div className="flex flex-col w-full">
          <div
            className={`relative ${
              parseFloat(amount) > (balance?.amount || 0)
                ? "border border-red-500 rounded-md w-full"
                : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 px-3 flex items-center">$</span>
            <input
              id="amount"
              onChange={handleChangeAmount}
              type="number"
              placeholder="eg 239.29"
              className="bg-gray-100 pl-10 py-2 rounded-md w-full"
            />
          </div>
          {parseFloat(amount) > (balance?.amount || 0) && (
            <p className="text-red-500">Error: Amount is greater than the balance.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="flex text-xl ml-2 font-semibold justify-start">
          Paypal Email
        </label>
        <div className="relative ">
          <span className="absolute inset-y-0 left-0 px-3 flex items-center">@</span>
          <input
            id="email"
            onChange={handleChangeEmail}
            type="string"
            placeholder="eg timmy@gmail.com"
            className="bg-gray-100 pl-10 py-2 rounded-md w-full"
          />
        </div>
      </div>

      {/*This is for the selection of the buttons*/}
      <div className="flex flex-col gap-2 ml-2">
        <label htmlFor="amount" className="flex text-xl font-semibold justify-start">
          Choose Cashout Method
        </label>
        <div className="flex flex-row justify-between items-center border-b-2 border-neutral-300">
          <div className="flex flex-row items-center gap-5 mb-2 justify-center">
            <img src="/assets/icons/paypal.svg" alt="paypal icon" className="h-5 w-5" />
            <p className="text-lg">Paypal</p>
          </div>
          <div>
            <input
              type="radio"
              value="paypal"
              name="paypal"
              onChange={handleChangeOption}
              checked={selectedOption === "paypal"}
              className="mb-2 scale-150 accent-red-500"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b-2 border-neutral-300">
          <div className="flex flex-row gap-5 mb-2 items-center justify-center">
            <img src="/assets/icons/localBank.svg" alt="local bank icon" className="h-5 w-5" />
            <p className="text-lg">Local Bank (Future)</p>
          </div>
          <div>
            <input
              type="radio"
              value="localBank"
              name="localBank"
              onChange={handleChangeOption}
              checked={selectedOption === "localBank"}
              className="mb-2 scale-150 accent-red-500"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b-2 border-neutral-300">
          <div className="flex flex-row gap-5 mb-2 items-center justify-center">
            <img src="/assets/icons/creditCard.svg" alt="credit card icon" className="h-5 w-5" />
            <p className="text-lg">Credit Card (Future)</p>
          </div>
          <div>
            <input
              type="radio"
              value="creditCard"
              name="creditCard"
              onChange={handleChangeOption}
              checked={selectedOption === "creditCard"}
              className="mb-2 scale-150 accent-red-500"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b-2 border-neutral-300">
          <div className="flex flex-row gap-5 mb-2 items-center justify-center">
            <img src="/assets/icons/7-11.svg" alt="Local Partners" className="h-5 w-5" />
            <p className="text-lg">7-11 (Future)</p>
          </div>
          <div>
            <input
              type="radio"
              value="creditCard"
              name="creditCard"
              onChange={handleChangeOption}
              checked={selectedOption === "creditCard"}
              className="mb-2 scale-150 accent-red-500"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b-2 border-neutral-300">
          <div className="flex flex-row gap-5 mb-2 items-center justify-center">
            <img src="/assets/icons/ministop.svg" alt="Local Partners" className="h-5 w-5" />
            <p className="text-lg">Convenience Shop (Future)</p>
          </div>
          <div>
            <input
              type="radio"
              value="creditCard"
              name="creditCard"
              onChange={handleChangeOption}
              checked={selectedOption === "creditCard"}
              className="mb-2 scale-150 accent-red-500"
              disabled
            />
          </div>
        </div>
      </div>

      <button
        className="bg-red-500 py-3 px-5 mt-6 items-center self-stretch rounded-md text-white font-bold hover:opacity-70 transition w-full"
        onClick={() => {
          handleCheck() && setModalNumber(2);
        }}
      >
        Next
      </button>
    </div>
  );
  const bodyContentAfter = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <label htmlFor="username" className="flex text-xl font-semibold justify-start">
          Amount:{" "}
        </label>
        <p className="text-bold text-xl">${amount}</p>
      </div>

      {selectedOption === "paypal" && (
        <div className="flex flex-col gap-5 items-start">
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="Cashout" className="flex text-xl font-semibold items-center">
              Cash out via:{" "}
            </label>
            <div className="flex flex-row gap-2 items-center">
              <img src="/assets/icons/paypal.svg" alt="paypal icon" className="h-5 w-5" />
              <p className="text-lg">PayPal</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="Cashout" className="flex text-xl font-semibold items-center">
              Paypal Email:{" "}
            </label>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-lg">{email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-3">
        <button
          className="py-2 px-5 border-2 border-red-500 rounded-md text-red-500 font-bold hover:opacity-70 transition w-full"
          onClick={() => {
            setModalNumber(1);
            pressback();
          }}
        >
          Back
        </button>
        <button
          className="py-2 px-5 border-2 border-red-500 bg-red-500 rounded-md text-white font-bold hover:opacity-70 transition w-full"
          onClick={() => {
            handleSubmit();
            setModalNumber(1);
            setOpen(false);
            pressback();
          }}
        >
          Cash out now
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleCheck} /*should be handle submit but this fuck shit throw me an error*/
      title="Cash Out"
      body={modalNumber === 1 ? bodyContent : bodyContentAfter}
    />
  );
};

export default CashOutModal;
