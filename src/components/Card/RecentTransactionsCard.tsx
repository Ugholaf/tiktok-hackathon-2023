import { useTransactionFullQuery, Currency, SortOrder } from "../../generated/graphql";
import { useState, useMemo } from "react";


// const columns = [
//   {
//     title: "date",
//     label: "Date",
//   },
//   {
//     title: "details",
//     label: "Details",
//   },
//   {
//     title: "amount",
//     label: "Amount",
//   },
// ];

// const data = [
//   {
//     date: "12/12/2020",
//     details: "Payment from John Doe",
//     amount: "₦ 10,000",
//   },
//   {
//     date: "12/12/2020",
//     details: "Payment from John Doe",
//     amount: "₦ 10,000",
//   },
//   {
//     date: "12/12/2020",
//     details: "Payment from John Doe",
//     amount: "₦ 10,000",
//   },
// ];
const RecentTransactionsCard = () => {

  const [now, setNow] = useState(new Date());
  const startOfMonth = useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [now]);

  const handleRefreshClick = () => {
    setNow(new Date());
  };

  const { data } = useTransactionFullQuery({
    pollInterval: 2000,
    variables: {
      fromDate: startOfMonth,
      currency: Currency.SGD,
      sortOrder: SortOrder.DESC,
    },

  });

  const transactions = data?.transactions;
  {/* Inspect this export type TransactionFullQuery */ }




  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 self-stretch items-center w-full bg-white">
      <p className="text-2xl font-bold border-b-2 inline border-red-600 mb-6 ">
        Recent Transactions
      </p>
      <div className="flex flex-col self-stretch w-full items-end">
        <div className="flex flex-col justify-between items-center self-stretch px-11 py-3 bg-gray-200 w-full rounded-lg">
          <div className="flex flex-row justify-between items-center self-stretch border-b border-black mb-2">
            {/* {columns.map((column) => (
              <p key={column.label} className="font-bold">
                {column.label}
              </p>
            ))} */}
            <p className="font-bold min-w-[70px] text-left">Date</p>
            <p className="font-bold">Type</p>
            <p className="font-bold">Amount</p>

          </div>
          {transactions?.transactionsIn.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex text-ellipsis justify-between gap-2 items-center self-stretch border-b border-neutral-300 mb-2">
              <div className="flex flex-col justify-between items-start">
                <p >{(new Date(transaction.createdAt).toLocaleDateString('en-GB').split("T")[0])}</p>
                <p >{(new Date(transaction.createdAt).toISOString().split("T")[1].slice(0, -5))}</p>
              </div>
              <div className="flex justify-center items-center">
                <p className="flex">{transaction.type.toLowerCase().replace(/_/g, " ")}</p>
              </div>
              <div className="flex justify-center items-center">
                <p >{transaction.amount.toFixed(2)} {transaction.currency} </p>
              </div>
            </div>

          ))}
          {/* {data.map((row, i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center self-stretch border-b border-neutral-300 mb-2"
            >
              <p className="text-gray-500">{row.date}</p>
              <p className="text-gray-500">{row.details}</p>
              <p className="text-gray-500">{row.amount}</p>
            </div>
          ))} */}
        </div>
        <div className="flex flex-row gap-2">
          <button className=" text-xs border-b border-black " onClick={handleRefreshClick}>Refresh</button>
          <button className=" text-xs border-b border-black ">View More</button>
        </div>

      </div>
    </div>
  );
};

export default RecentTransactionsCard;
