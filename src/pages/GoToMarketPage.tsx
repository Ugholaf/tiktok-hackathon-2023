import GoToMarketCard from "../components/Card/GoToMarketCard";
import Layout from "../components/Layout/Layout";




const GoToMarketPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 w-screen px-6 sm:12 md:px-32 py-9">
        <GoToMarketCard />
      </div>
    </Layout>
  );
};

export default GoToMarketPage;
