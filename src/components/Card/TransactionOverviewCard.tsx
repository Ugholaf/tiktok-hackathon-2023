import { Currency, useGetTransactionSummaryQuery, SortOrder } from "../../generated/graphql";
import { useState, useMemo } from "react";

const TransactionOverviewCard = () => {


  const [now, setNow] = useState(new Date());
  const startOfMonth = useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [now]);

  // const now 
  //let now = useMemo(() => new Date(), []);
  //const startOfMonth = useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [now]);

  const later = () => new Date();
  console.log("START OF MONTH", later);

  const handleRefreshClick = () => {
    setNow(new Date());
  };


  const { data } = useGetTransactionSummaryQuery({
    pollInterval: 2000,
    variables: {
      fromDate: startOfMonth,
      currency: Currency.SGD,
      sortOrder: SortOrder.DESC,
    },
  });






  const amountIn = (data?.getTransactionSummary?.amountIn?.valueOf() || 0).toFixed(2);
  const amountOut = (data?.getTransactionSummary?.amountOut?.valueOf() || 0).toFixed(2);

  const sum = (parseFloat(amountIn) + parseFloat(amountOut)).toFixed(2);





  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 self-stretch items-center w-full bg-white">
      <p className="text-2xl font-bold border-b-2 inline border-red-600 mb-6 ">
        MTD Transaction Overview
      </p>
      <div className="flex flex-col self-stretch w-full items-end">
        <div className="grid-cols-1 xl:flex justify-between items-center self-stretch px-11 py-3 bg-gray-200 w-full rounded-t-lg">

          {/* <div className="flex flex-row justify-between items-center self-stretch px-11 py-3 bg-gray-200 w-full rounded-t-lg"> */}

          <div className="flex flex-col py-1 justify-center items-center">
            <div className="flex flex-row">
              <p className="text-base md:text-xl font-bold">Payments In</p>
              <img src="/assets/payinUp.svg" alt="payment in" />
            </div>
            <p className="text-base md:text-lg ">${data?.getTransactionSummary?.amountIn?.valueOf()} SGD</p>
          </div>
          <div className="flex flex-col py-1 justify-center items-center">
            <div className="flex flex-row">
              <p className="text-base md:text-xl font-bold">Payments Out</p>
              <img src="/assets/payinOut.svg" alt="payment out" />
            </div>
            <p className="text-base md:text-lg ">${data?.getTransactionSummary?.amountOut?.valueOf()} SGD</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-3 py-3 bg-gray-100 w-full rounded-b-lg">
          <div className="flex flex-row">
            <p className="text-base md:text-2xl font-bold">Net Change in Balance</p>
            {parseFloat(sum) > 0 ? (
              <img src="/assets/payinUp.svg" alt="payment in" />
            ) : (
              <img src="/assets/payinOut.svg" alt="payment out" />
            )}
          </div>
          <p className="text-base md:text-xl">${sum} SGD</p>
        </div>
        <div className="flex flex-row justify-end gap-2 w-full px-2">
          <button className="text-xs border-b border-black" onClick={handleRefreshClick}>Refresh</button>
          <button className=" text-xs border-b border-black ">View More</button>

        </div>
      </div>
    </div>
  );
};

export default TransactionOverviewCard;
