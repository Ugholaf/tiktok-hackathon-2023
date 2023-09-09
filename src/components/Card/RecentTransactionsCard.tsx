import dayjs from "dayjs";
import { useTransactionFullQuery, Currency, SortOrder } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

const RecentTransactionsCard = () => {
  const { data, refetch } = useTransactionFullQuery({
    pollInterval: 2000,
    variables: {
      fromDate: startOfMonth,
      currency: Currency.SGD,
      sortOrder: SortOrder.DESC,
    },
  });

  const navigate = useNavigate();

  const transactions = data?.transactions;

  const mostRecentTrxn = [
    ...(transactions?.transactionsIn.slice(0, 3) ?? []),
    ...(transactions?.transactionsOut.slice(0, 3) ?? []),
  ]
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 3);

  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 self-stretch items-center w-full shadow-md bg-white">
      <p className="text-2xl font-bold border-b-2 inline border-red-600 mb-6 ">
        Recent Transactions
      </p>
      <div className="flex flex-col self-stretch w-full items-end">
        <div className="flex flex-col justify-between items-center self-stretch px-4 xl:px-11 py-3 bg-gray-200 w-full rounded-lg">
          <div className="grid grid-cols-[1fr_1fr_1fr] justify-between items-center self-stretch border-b border-black mb-2">
            <p className="font-bold min-w-[78px] lg:min-w-[86px] text-left">Date</p>
            <p className="font-bold">Type</p>
            <p className="font-bold">Amount</p>
          </div>
          {mostRecentTrxn.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-[1fr_1fr_1fr] text-ellipsis justify-between gap-2 items-center self-stretch border-b border-neutral-300 mb-2"
            >
              <div className="flex flex-col justify-between items-start">
                <p className="text-sm xl:text-base">
                  {dayjs(transaction.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-sm xl:text-base">
                  {transaction.type
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLocaleLowerCase())
                    .join(" ")}
                </p>
              </div>
              <div className="flex justify-center items-right">
                <p className="text-sm xl:text-base text-right">
                  $
                  {transaction?.amount.toLocaleString("en-SG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {transaction.currency}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2">
          <button className=" text-xs border-b border-black " onClick={() => refetch()}>
            Refresh
          </button>
          <button
            className=" text-xs border-b border-black"
            onClick={() => navigate("/transaction")}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionsCard;
