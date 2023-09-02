import TransactionOverviewCard from "../components/Card/TransactionOverviewCard";
import WalletBalanceCard from "../components/Card/WalletBalanceCard";
import Layout from "../components/Layout/Layout";

const PersonalPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-9 w-full px-24 py-9">
        <div className="flex flex-col items-center gap-8">
          <div className="flex justify-center items-center gap-3 self-stretch">
            <WalletBalanceCard />
            <TransactionOverviewCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalPage;
