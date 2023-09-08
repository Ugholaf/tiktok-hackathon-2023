import { Currency, useGetTransactionSummaryQuery, SortOrder } from "../../generated/graphql";
import { useMemo } from "react";


const LoyaltyCard = () => {


    const now = new Date();
    const startOfMonth = useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [now]);

    const { data } = useGetTransactionSummaryQuery({
        pollInterval: 2000,
        variables: {
            fromDate: startOfMonth,
            currency: Currency.SGD,
            sortOrder: SortOrder.DESC,
        },
    });

    const points = ((data?.getTransactionSummary?.amountOut?.valueOf() || 0) * 2.5).toFixed(2);


    return (
        <div className="flex flex-col rounded-xl py-6 px-6 md:px-11  my-6 space-y-2 self-stretch items-center w-full shadow-md bg-white">

            <p className="flex flex-row text-2xl font-bold border-b-2 border-red-500 mb-6">
                <img src="/assets/buttons/Tpoints.svg" alt="person" />  &nbsp;  TPlus-Points
            </p>
            <div className="flex flex-col self-stretch w-full items-end"> {/*flex flex-col items-start px-3 py-1 bg-gray-200 w-full rounded-t-lg"*/}

                <div className="grid-cols-1 xl:flex justify-between items-center self-stretch px-3 py-3 bg-gray-200 w-full rounded-t-lg">
                    <img src="/assets/buttons/Tpointslarge.svg" alt="person" />
                    <div className="flex flex-col items-start px-3 py-1 bg-gray-200 w-full rounded-t-lg">
                        <p className="text-3xl">
                            {-points}
                        </p>
                        <p className="text-base text-gray-500">TPlus points available</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-left px-3 py-3 bg-gray-100 w-full rounded-b-lg">
                    <p className="text-sm text-left px-3 "> - T-Points is our T-Money's flagship loyalty program!</p>
                    <p className="text-sm text-left px-3 ">- Earn 2.5 TPlus Point for every Dollar you spend to save up for great rewards to be used at our partners!</p>
                </div>
            </div>
            <div className="flex flex-row justify-center space-x-4">
                <img src="/assets/recentcontact/viewmore.svg" alt="person" />
                <p className="text-base font-bold ">Learn More!</p>
            </div>

        </div >
    )
}
export default LoyaltyCard