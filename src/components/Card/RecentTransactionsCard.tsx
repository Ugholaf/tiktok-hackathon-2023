const columns = [
  {
    title: "date",
    label: "Date",
  },
  {
    title: "details",
    label: "Details",
  },
  {
    title: "amount",
    label: "Amount",
  },
];

const data = [
  {
    date: "12/12/2020",
    details: "Payment from John Doe",
    amount: "₦ 10,000",
  },
  {
    date: "12/12/2020",
    details: "Payment from John Doe",
    amount: "₦ 10,000",
  },
  {
    date: "12/12/2020",
    details: "Payment from John Doe",
    amount: "₦ 10,000",
  },
];
const RecentTransactionsCard = () => {
  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 self-stretch items-center w-full bg-white">
      <p className="text-2xl font-bold border-b-2 inline border-red-600 mb-6 ">
        Recent Transactions
      </p>
      <div className="flex flex-col self-stretch w-full items-end">
        <div className="flex flex-col justify-between items-center self-stretch px-11 py-3 bg-gray-200 w-full rounded-lg">
          <div className="flex flex-row justify-between items-center self-stretch border-b border-black mb-2">
            {columns.map((column) => (
              <p key={column.label} className="font-bold">
                {column.label}
              </p>
            ))}
          </div>
          {data.map((row, i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center self-stretch border-b border-neutral-300 mb-2"
            >
              <p className="text-gray-500">{row.date}</p>
              <p className="text-gray-500">{row.details}</p>
              <p className="text-gray-500">{row.amount}</p>
            </div>
          ))}
        </div>
        <button className=" text-xs border-b border-black ">View More</button>
      </div>
    </div>
  );
};

export default RecentTransactionsCard;
