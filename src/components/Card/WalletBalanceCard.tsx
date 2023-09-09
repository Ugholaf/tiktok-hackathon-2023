import { useState } from "react";
import CashInModal from "../Modal/CashInModal";
import PaypalModal from "../Modal/PaypalModal";
import P2PTransferModal from "../Modal/P2PTransferModal";
import CashOutModal from "../Modal/CashOutModal";
import QRCodeModal from "../Modal/QRCodeModal";
import ScanModal from "../Modal/ScanModal";
import { useMeQuery } from "../../generated/graphql";

const WalletBalanceCard = () => {
  const [openCashIn, setOpenCashIn] = useState(false);
  const [openPaypal, setOpenPaypal] = useState(false);
  const [openP2PTransfer, setOpenP2PTransfer] = useState(false);
  const [OpenCashOut, setOpenCashOut] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [openScan, setOpenScan] = useState(false);

  const { data } = useMeQuery({
    pollInterval: 2000,
  });
  const balance = data?.me.balances.find(
    (balance) => balance.currency === "SGD"
  );

  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 self-stretch items-center shadow-md w-full bg-white">
      <p className="text-2xl font-bold border-b-2 border-red-600 mb-6">
        Wallet Balance
      </p>
      <div className="flex flex-col items-start self-stretch w-full">
        <div className="flex flex-col items-start px-3 py-1 bg-gray-200 w-full rounded-t-lg">
          <p className="text-3xl">
            $
            {(balance?.amount ?? 0).toLocaleString("en-SG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {balance?.currency}
          </p>
          <p className="text-base text-gray-500">Available</p>
        </div>
        <div className="flex flex-col items-start px-3 py-3 bg-gray-100 w-full rounded-b-lg">
          <div className="grid grid-cols-[1fr_1fr] justify-start items-center gap-3 self-stretch">
            <button
              className="flex flex-row gap-2 bg-white py-2 px-3 justify-start items-center shadow-md rounded-md text-sm md:text-base"
              onClick={() => setOpenCashIn(true)}
            >
              <img src="public/assets/buttons/cashIn.svg" alt="cash in" />
              Cash In
            </button>
            <button
              className="flex flex-row gap-2 bg-white py-2 px-2 md:px-3 justify-start items-center shadow-md rounded-md text-sm md:text-base"
              onClick={() => setOpenCashOut(true)}
            >
              <img src="public/assets/buttons/cashOut.svg" alt="cash out" />
              Cash Out
            </button>
            <button
              className="flex flex-row gap-2 bg-white py-2 px-2 md:px-3 justify-start items-center shadow-md rounded-md text-sm md:text-base"
              onClick={() => setOpenP2PTransfer(true)}
            >
              <img
                src="public/assets/buttons/p2pTransfer.svg"
                alt="p2p transfer"
              />
              P2P Transfer
            </button>
            <button
              className="flex flex-row gap-2 bg-white py-2 px-2 md:px-3 justify-start items-center shadow-md rounded-md text-sm md:text-base"
              onClick={() => setOpenScan(true)}
            >
              <img src="public/assets/buttons/scan.svg" alt="scan" />
              Scan QR
            </button>
            <button
              className="flex flex-row gap-2 bg-white py-2 px-2 md:px-3 justify-start items-center shadow-md rounded-md text-sm md:text-base"
              onClick={() => setOpenQR(true)}
            >
              <img src="public/assets/buttons/qrcode.svg" alt="qrcode" />
              Display QR
            </button>
            <div className="flex flex-row gap-2 bg-white py-2 px-2 md:px-3 justify-start items-center shadow-md rounded-md text-sm md:text-base">
              <img src="public/assets/buttons/conversion.svg" alt="qrcode" />
              Conversion
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}

      <P2PTransferModal open={openP2PTransfer} setOpen={setOpenP2PTransfer} />
      <CashOutModal open={OpenCashOut} setOpen={setOpenCashOut} />
      <CashInModal
        open={openCashIn}
        setOpen={setOpenCashIn}
        setOpenPaypal={setOpenPaypal}
      />
      <PaypalModal open={openPaypal} setOpen={setOpenPaypal} />

      <QRCodeModal open={openQR} setOpen={setOpenQR} />

      <ScanModal open={openScan} setOpen={setOpenScan} />
    </div>
  );
};

export default WalletBalanceCard;
