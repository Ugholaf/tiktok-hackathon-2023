import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { p2pTransactionPrefix } from "./QRCodeModal";
import { useMerchantGetQrDetailsLazyQuery } from "../../generated/graphql";

interface ScanModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

enum ModalType {
  SCAN = 1,
  CONFIRM,
  READER,
  P2P,
}

const ScanModal: React.FC<ScanModalProps> = ({ open, setOpen }) => {
  const [modal, setModal] = useState(ModalType.SCAN);
  const [QRString, setQRString] = useState<string | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const [fetchMerchantPaymentData, { error }] =
    useMerchantGetQrDetailsLazyQuery();

  const handleChangeQrCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRString(e.target.value);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const handleClose = () => {
    setQRString(null);
    setOpen(false);
    setModal(ModalType.SCAN);
  };

  const handleBack = () => {
    setAmount(undefined);
    setUsername(undefined);
    setQRString(null);
    setModal(ModalType.SCAN);
  };

  const handleProceed = async () => {
    if (!QRString) {
      toast.error("QR string cannot be empty");
      return;
    }

    if (QRString.startsWith(p2pTransactionPrefix)) {
      setUsername(QRString.split("-")[1]);
      setModal(ModalType.P2P);
      return;
    }

    const merchantPaymentData = await fetchMerchantPaymentData({
      variables: {
        merchantGetQrDetailsId: QRString,
      },
    });

    if (error) {
      toast.error("Error fetching merchant payment data");
      return;
    }

    setUsername(merchantPaymentData.data?.merchantGetQRDetails.merchantId);
    setAmount(merchantPaymentData.data?.merchantGetQRDetails.amount);
    setModal(ModalType.CONFIRM);
  };

  const handleScan = () => {
    setModal(ModalType.READER);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleNext = () => {
    if (!username) {
      toast.error("Username cannot be empty");
      return;
    }

    if (!amount) {
      toast.error("Amount cannot be empty");
      return;
    }

    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setModal(ModalType.CONFIRM);
  };

  const scanBody = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="flex text-xl font-semibold justify-start"
        >
          Paste QR String
        </label>
        <div className="relative ">
          <input
            id="amount"
            onChange={handleChangeQrCode}
            type="number"
            placeholder="eg UXJSADU#!*&EFBNDSCDS(I@"
            className="bg-gray-100 pl-4 py-2 rounded-md w-full"
          />
        </div>
      </div>

      <button
        className="border-red-500 border-2 py-1.5 px-5 items-center self-stretch rounded-md text-red-500 font-bold hover:opacity-70 transition w-full"
        onClick={handleProceed}
      >
        Proceed
      </button>

      {/*This is for the selection of the buttons*/}

      <div className="flex flex-row items-center gap-2">
        <div className="flex-grow border-t border-gray-400"></div>
        <p className="text-gray-400">OR</p>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <button
        className="bg-red-500 border-red-500 border-2 py-1.5 px-5 items-center self-stretch rounded-md text-white font-bold hover:opacity-70 transition w-full"
        onClick={handleScan}
      >
        Scan with Camera
      </button>
    </div>
  );
  const confirmBody = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-2 items-center">
        <label
          htmlFor="username"
          className="flex text-xl font-semibold justify-start"
        >
          To:
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
        <p className="text-bold text-xl">$ {amount === 0 ? "" : amount}</p>
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <button
          className="py-2 px-5 border-2 border-red-500 rounded-md text-red-500 font-bold hover:opacity-70 transition w-full"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="py-2 px-5 border-2 border-red-500 bg-red-500 rounded-md text-white font-bold hover:opacity-70 transition w-full"
          onClick={() => {
            console.log("Cash out");
          }}
        >
          Click to Pay
        </button>
      </div>
    </div>
  );

  const readerBody = (
    <QrScanner
      onDecode={async (result) => {
        setQRString(result);
        // query to figure out is p2p or merch
        if (result.startsWith(p2pTransactionPrefix)) {
          setUsername(result.split("-")[1]);
          setModal(ModalType.P2P);
          return;
        }

        const merchantPaymentData = await fetchMerchantPaymentData({
          variables: {
            merchantGetQrDetailsId: result,
          },
        });

        if (error) {
          toast.error("Error fetching merchant payment data");
          return;
        }

        setUsername(merchantPaymentData.data?.merchantGetQRDetails.merchantId);
        setAmount(merchantPaymentData.data?.merchantGetQRDetails.amount);
        setModal(ModalType.CONFIRM);
      }}
      onError={(error) => console.log(error?.message)}
    />
  );

  const p2pBody = (
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
            id="username"
            onChange={handleChangeUsername}
            type="text"
            value={username || ""}
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
      <button
        className="bg-red-500 py-3 px-5 mt-6 items-center self-stretch rounded-md text-white font-bold hover:opacity-70 transition w-full"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );

  const modalBodyRecord: Record<ModalType, JSX.Element> = {
    [ModalType.SCAN]: scanBody,
    [ModalType.CONFIRM]: confirmBody,
    [ModalType.READER]: readerBody,
    [ModalType.P2P]: p2pBody,
  };

  const modalTitleRecord: Record<ModalType, string> = {
    [ModalType.SCAN]: "Scan QR to pay",
    [ModalType.CONFIRM]: "Check your payment",
    [ModalType.READER]: "Scan QR to pay",
    [ModalType.P2P]: "Send a payment",
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={modalTitleRecord[modal]}
      body={modalBodyRecord[modal]}
    />
  );
};

export default ScanModal;
