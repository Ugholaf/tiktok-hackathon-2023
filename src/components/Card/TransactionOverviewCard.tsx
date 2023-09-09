import {
  Currency,
  useGetTransactionSummaryQuery,
  SortOrder,
} from "../../generated/graphql";
import { useNavigate } from "react-router";

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

const TransactionOverviewCard = () => {
  const { data, refetch } = useGetTransactionSummaryQuery({
    pollInterval: 2000,
    variables: {
      fromDate: startOfMonth,
      currency: Currency.SGD,
      sortOrder: SortOrder.DESC,
    },
  });

  const amountIn = data?.getTransactionSummary?.amountIn?.valueOf() || 0;
  const amountOut =
    -1 * (data?.getTransactionSummary?.amountOut?.valueOf() || 0);

  const sum = amountIn - amountOut;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 self-stretch shadow-md items-center w-full bg-white">
      <p className="text-2xl font-bold border-b-2 inline border-red-600 mb-6 ">
        MTD Transaction Overview
      </p>
      <div className="flex flex-col self-stretch w-full items-end">
        <div className="grid-cols-1 xl:flex justify-between items-center self-stretch px-11 py-3 bg-gray-200 w-full rounded-t-lg">
          <div className="flex flex-col py-1 justify-center items-center">
            <div className="flex flex-row">
              <p className="text-base md:text-xl font-bold">Payments In</p>
              <img src="public/assets/payinUp.svg" alt="payment in" />
            </div>
            <p className="text-base md:text-lg ">
              $
              {amountIn.toLocaleString("en-SG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              SGD
            </p>
          </div>
          <div className="flex flex-col py-1 justify-center items-center">
            <div className="flex flex-row">
              <p className="text-base md:text-xl font-bold">Payments Out</p>
              <img src="public/assets/payinOut.svg" alt="payment out" />
            </div>
            <p className="text-base md:text-lg ">
              $
              {amountOut.toLocaleString("en-SG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              SGD
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-3 py-3 bg-gray-100 w-full rounded-b-lg">
          <div className="flex flex-row">
            <p className="text-base md:text-2xl font-bold">
              Net Change in Balance
            </p>
            {sum > 0 ? (
              <img src="public/assets/payinUp.svg" alt="payment in" />
            ) : (
              <img src="public/assets/payinOut.svg" alt="payment out" />
            )}
          </div>
          <p className="text-base md:text-xl">
            $
            {sum.toLocaleString("en-SG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            SGD
          </p>
        </div>
        <div className="flex flex-row justify-end gap-2 w-full px-2">
          <button
            className="text-xs border-b border-black"
            onClick={() => refetch()}
          >
            Refresh
          </button>
          <button
            onClick={() => navigate("/transaction")}
            className=" text-xs border-b border-black "
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionOverviewCard;
