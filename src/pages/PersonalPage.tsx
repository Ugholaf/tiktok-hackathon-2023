import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaypalDepositCard } from "../components/Card/PaypalDepositCard";
import TransactionOverviewCard from "../components/Card/TransactionOverviewCard";
import WalletBalanceCard from "../components/Card/WalletBalanceCard";
import Layout from "../components/Layout/Layout";

const PersonalPage = () => {
  // TODO: Get the currency from redux global storage
  return (
    <Layout>
      <PayPalScriptProvider
        options={{
          currency: "SGD",
          intent: "capture",
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        }}
      >
        <div className="flex flex-col items-center gap-9 w-full px-24 py-9">
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center items-center gap-3 self-stretch">
              <WalletBalanceCard />
              <TransactionOverviewCard />
              <PaypalDepositCard />
            </div>
          </div>
        </div>
      </PayPalScriptProvider>
    </Layout>
  );
};

export default PersonalPage;
