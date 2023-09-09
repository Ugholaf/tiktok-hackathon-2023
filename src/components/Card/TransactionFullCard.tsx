import { useTransactionFullQuery, Currency, SortOrder } from "../../generated/graphql";

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

const TransactionFullCard = () => {
  const { data, refetch } = useTransactionFullQuery({
    pollInterval: 2000,
    variables: {
      fromDate: startOfMonth,
      currency: Currency.SGD,
      sortOrder: SortOrder.DESC,
    },
    fetchPolicy: "cache-and-network",
  });

  const transactions = data?.transactions;

  return (
    <div className="flex flex-col rounded-xl py-3 px-3 md:px-11 my-6 self-stretch items-center w-full bg-white">
      <p className="text-2xl font-bold border-b-2 inline border-red-600 mb-6 ">
        View your transaction history
      </p>
      <div className="flex flex-col self-stretch w-full items-end">
        <div className="flex flex-col justify-between items-center self-stretch px-3 lg:px-11 py-3 bg-gray-200 w-full rounded-lg">
          <div className="flex flex-row justify-between items-center self-stretch border-b border-black mb-2">
            <p className="font-bold min-w-[90px] lg:min-w-[160px] text-left">Date</p>
            <p className="font-bold">Type</p>
            <p className="font-bold lg:min-w-[160px] text-right">Amount</p>
          </div>
          {transactions?.transactionsIn?.slice(0).map((transaction) => (
            <div
              key={transaction.id}
              className="flex text-ellipsis justify-between gap-2 items-center self-stretch border-b border-neutral-300 mb-2"
            >
              <div className="flex flex-col min-w-[90px] lg:flex-row justify-between items-start lg:min-w-[160px]">
                <p className="text-sm max-w-[90px] lg:text-base lg:max-w-[200px] ">
                  {new Date(transaction.createdAt).toLocaleDateString("en-GB").split("T")[0]} &nbsp;{" "}
                </p>
                <p className="text-sm max-w-[90px] lg:text-base lg:max-w-[200px] ">
                  {new Date(transaction.createdAt).toISOString().split("T")[1].slice(0, -5)}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-sm lg:text-base">
                  {transaction.type.toLowerCase().replace(/_/g, " ")}
                </p>
              </div>
              <div className="flex justify-end max-w-[62px] lg:min-w-[160px]">
                <p className="text-sm lg:text-base text-right">
                  {transaction.amount.toFixed(2)} {transaction.currency}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2">
          <button className=" text-xs border-b border-black " onClick={() => refetch()}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFullCard;
