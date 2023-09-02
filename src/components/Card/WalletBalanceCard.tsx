const WalletBalanceCard = () => {
  return (
    <div className="flex flex-col rounded-xl py-6 px-11 my-6 self-stretch items-center  bg-white w-3/6">
      <p className="text-2xl font-bold border-b-2 border-red-600 mb-6">
        Wallet Balance
      </p>
      <div className="flex flex-col items-start self-stretch w-full">
        <div className="flex flex-col items-start px-3 py-1 bg-gray-200 w-full rounded-t-lg">
          <p className="text-3xl">$100.00 SGD</p>
          <p className="text-base text-gray-500">Available</p>
        </div>
        <div className="flex flex-col items-start px-3 py-3 bg-gray-100 w-full rounded-b-lg">
          <p className="text-base mb-2">Perform Transactions</p>
          <div className="flex flex-wrap justify-between items-center gap-3 self-stretch">
            <button className="flex flex-row gap-1 bg-white py-2 px-3 justify-between shadow-md rounded-md">
              <img src="/src/assets/buttons/cashIn.svg" alt="cash in" />
              Cash In
            </button>
            <button className="flex flex-row gap-1 bg-white py-2 px-3 justify-between shadow-md rounded-md">
              <img src="/src/assets/buttons/cashOut.svg" alt="cash out" />
              Cash Out
            </button>
            <button className="flex flex-row gap-1 bg-white py-2 px-3 justify-between shadow-md rounded-md">
              <img
                src="/src/assets/buttons/p2pTransfer.svg"
                alt="p2p transfer"
              />
              P2P Transfer
            </button>
            <button className="flex flex-row gap-1 bg-white py-2 px-3 justify-between shadow-md rounded-md">
              <img src="/src/assets/buttons/scan.svg" alt="scan" />
              Scan
            </button>
            <button className="flex flex-row gap-1 bg-white py-2 px-3 justify-between shadow-md rounded-md">
              <img src="/src/assets/buttons/qrcode.svg" alt="qrcode" />
              My QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
