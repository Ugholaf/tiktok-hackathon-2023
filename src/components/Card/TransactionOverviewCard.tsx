const TransactionOverviewCard = () => {
  return (
    <div className="flex flex-col rounded-xl py-6 px-11 my-6 self-stretch items-center  bg-white w-3/6">
      <p className="text-2xl font-bold border-b-2 border-red-600 mb-6">
        MTD Transaction Overview
      </p>
      <div className="flex flex-col items-start self-stretch w-full">
        <div className="flex flex-row space-between items-center self-stretch px-11 py-3 bg-gray-200 w-full rounded-t-lg">
          <div className="flex flex-col py-1 justify-center items-center">
            <div className="flex flex-row">
              <p className="text-2xl font-bold">Payments In</p>
              <img src="/src/assets/payinUp.svg" alt="payment in" />
            </div>
            <p className="text-base ">$125.00 SGD</p>
          </div>
          <div className="flex flex-col py-1 justify-center items-center">
            <div className="flex flex-row">
              <p className="text-2xl font-bold">Payments Out</p>
              <img src="/src/assets/payinOut.svg" alt="payment out" />
            </div>
            <p className="text-base ">$100.00 SGD</p>
          </div>
        </div>
        <div className="flex flex-col items-start px-3 py-3 bg-gray-100 w-full rounded-b-lg">
          net spending
        </div>
      </div>
    </div>
  );
};

export default TransactionOverviewCard;
