import TransactionOverviewCard from "../components/Card/TransactionOverviewCard";
import WalletBalanceCard from "../components/Card/WalletBalanceCard";
import FutureImprovementsCard from "../components/Card/FutureImprovementsCard";
import RecentTransactionsCard from "../components/Card/RecentTransactionsCard";
import Layout from "../components/Layout/Layout";
import LoyaltyCard from "../components/Card/LoyaltyCard";
import { AccountType, useMeQuery } from "../generated/graphql";
import BusinessToolsCard from "../components/Card/BusinessToolsCard";

const Homepage = () => {
  const { data: meData } = useMeQuery();

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 w-screen px-6 sm:12 md:px-32 py-9">
        <div className="flex flex-col items-center w-full">
          <div className="grid grid-cols-1 place-items-center justify-center w-full lg:grid-cols-2 gap-4 ">
            <WalletBalanceCard />
            <TransactionOverviewCard />
          </div>
          <div className="grid grid-cols-1 place-items-center justify-center w-full lg:grid-cols-2 gap-4 ">
            <RecentTransactionsCard />
            {/* replace this with contact card */}
            {meData?.me.accountType === AccountType.BUSINESS ? (
              <BusinessToolsCard />
            ) : (
              <LoyaltyCard />
            )}
          </div>
          <div className="flex justify-center items-center gap-3 self-stretch">
            <FutureImprovementsCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
