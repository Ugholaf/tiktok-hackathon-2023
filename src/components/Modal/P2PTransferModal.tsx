import { useState, useRef } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import {
  Currency,
  useMakeInternalTransferMutation,
} from "../../generated/graphql";

interface P2PTransferModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const P2PTransferModal: React.FC<P2PTransferModalProps> = ({
  open,
  setOpen,
}) => {
  const [makeInternalTransfer] = useMakeInternalTransferMutation();
  const checkoutRef = useRef("");
  const [modalNumber, setModalNumber] = useState(1);
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const handleCheck = () => {
    const convertedAmount = Number(amount);

    if (!username) {
      toast.error("Username cannot be empty");
      return false;
    }

    if (!convertedAmount) {
      toast.error("Amount cannot be empty");
      return false;
    }

    if (convertedAmount < 0) {
      toast.error("Amount must be greater than 0");
      return false;
    }
    {
      /*setOpen(false);*/
    }

    {
      /*setOpen(false);*/
    }

    return true;
  };

  const pressback = () => {
    setNotes("");
    setAmount("");
    setUsername("");
  };

  const handleSubmit = async () => {
    const convertedAmount = Number(amount);
    if (!convertedAmount) {
      toast.error("Amount cannot be empty");
      return;
    }

    if (convertedAmount < 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    const { data: transferData, errors } = await makeInternalTransfer({
      variables: {
        amount: convertedAmount,
        currency: Currency.SGD,
        toUsername: username,
        note: notes,
      },
    });
    if (!transferData?.makeInternalTransfer.receiverId || errors?.length) {
      toast.error("Error Sending money to user (Username not found)");
      throw new Error("Error Sending money");
    }

    checkoutRef.current = transferData.makeInternalTransfer.receiverId;
    console.log(checkoutRef.current);
    toast.success("Successfully Sent money");

    {
      /*setOpen(false);*/
    }
  };
  const bodyContent = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="flex text-xl ml-2 font-semibold justify-start"
        >
          Username
        </label>
        <div className="relative ">
          <img
            src="/src/assets/recentcontact/person.svg"
            alt="person"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-2 flex justify-center items-center w-8"
          />
          <input
            id="username"
            onChange={handleChangeUsername}
            type="text"
            placeholder="Enter the username"
            className="bg-gray-100 pl-10 py-2 rounded-md w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="flex text-xl ml-2 font-semibold justify-start"
        >
          Amount
        </label>
        <div className="relative ">
          <span className="absolute inset-y-0 left-0 px-3 flex items-center">
            $
          </span>
          <input
            id="amount"
            onChange={handleChangeAmount}
            type="number"
            placeholder="eg 239.29"
            className="bg-gray-100 pl-10 py-2 rounded-md w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="notes"
          className="flex text-xl ml-2 font-semibold justify-start"
        >
          Notes
        </label>
        <div className="relative ">
          <span className="absolute inset-y-0 left-0 px-2 flex items-center">
            &#128221;
          </span>
          <input
            id="notes"
            onChange={handleChangeNotes}
            type="text"
            placeholder="eg. For dinner"
            className="bg-gray-100 pl-10 py-2 rounded-md w-full"
          />
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
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-2 items-center">
        <label
          htmlFor="username"
          className="flex text-xl font-semibold justify-start"
        >
          Username:
        </label>
        <p className="text-bold text-xl">{username}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label
          htmlFor="username"
          className="flex text-xl font-semibold justify-start"
        >
          Amount:{" "}
        </label>
        <p className="text-bold text-xl">${amount}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label
          htmlFor="username"
          className="flex text-xl font-semibold justify-start"
        >
          Notes:
        </label>
        <p className="text-bold text-xl">{notes}</p>
      </div>
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
          Pay
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Confirm the transfer"
      body={modalNumber === 1 ? bodyContent : bodyContentAfter}
    />
  );
};

export default P2PTransferModal;
