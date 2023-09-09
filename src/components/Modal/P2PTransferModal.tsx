import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import {
  Currency,
  useMakeInternalTransferMutation,
} from "../../generated/graphql";
import { useMeQuery } from "../../generated/graphql";

interface P2PTransferModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// TODO: Add input validation
const P2PTransferModal: React.FC<P2PTransferModalProps> = ({
  open,
  setOpen,
}) => {
  const [makeInternalTransfer] = useMakeInternalTransferMutation();
  const [modalNumber, setModalNumber] = useState(1);
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState("");

  const { data } = useMeQuery();

  const balance = data?.me.balances.find(
    (balance) => balance.currency === "SGD"
  );

  const handleClose = () => {
    setAmount("");
    setUsername("");
    setNotes("");
    setModalNumber(1);
    setOpen(false);
    setAmount("");
    setUsername("");
    setNotes("");
    setModalNumber(1);
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

    if (balance === undefined) {
      toast.error("There is an error with the account");
      return false;
    } else if (balance.amount < 0) {
      toast.error("Amount must be greater than 0");
      return false;
    }

    return true;
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
    try {
      const { data } = await makeInternalTransfer({
        variables: {
          amount: convertedAmount,
          currency: Currency.SGD,
          toUsername: username,
          note: notes,
        },
      });

      if (data?.makeInternalTransfer) {
        toast.success("Successfully Sent money");
        setModalNumber(1);
        setOpen(false);

        return;
      }

      throw new Error("Error Sending money to user");
    } catch (error: unknown) {
      if ((error as Error)?.message.includes("Receiver not found")) {
        toast.error("Error Sending money to user (Username not found)");
      } else {
        toast.error("Error Sending money to user");
      }

      console.log(error);
    }
  };

  const disabledNext = parseFloat(amount) > (balance?.amount || 0);

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
            src="/assets/recentcontact/person.svg"
            alt="person"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-2 flex justify-center items-center w-8"
          />
          <input
            value={username}
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
        <div className="flex flex-col w-full">
          <div
            className={`relative ${
              disabledNext ? "border border-red-500 rounded-md w-full" : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 px-3 flex items-center">
              $
            </span>
            <input
              value={amount}
              id="amount"
              onChange={handleChangeAmount}
              type="number"
              placeholder="eg 239.29"
              className="bg-gray-100 pl-10 py-2 rounded-md w-full"
            />
          </div>
          {disabledNext && (
            <p className="text-red-500">
              Error: Amount is greater than the balance.
            </p>
          )}
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
            value={notes}
            id="notes"
            onChange={handleChangeNotes}
            type="text"
            placeholder="eg. For dinner"
            className="bg-gray-100 pl-10 py-2 rounded-md w-full"
          />
        </div>
      </div>
      <button
        className="bg-red-500 py-3 px-5 mt-6 items-center self-stretch rounded-md text-white font-bold hover:opacity-70 transition w-full disabled:bg-red-300 disabled:cursor-not-allowed"
        onClick={() => {
          handleCheck() && setModalNumber(2);
        }}
        disabled={!username || !amount || disabledNext}
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
          }}
        >
          Back
        </button>
        <button
          className="py-2 px-5 border-2 border-red-500 bg-red-500 rounded-md text-white font-bold hover:opacity-70 transition w-full"
          onClick={handleSubmit}
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
      title={modalNumber === 1 ? "P2P transfer" : "Confirm the transfer"}
      body={modalNumber === 1 ? bodyContent : bodyContentAfter}
    />
  );
};

export default P2PTransferModal;
