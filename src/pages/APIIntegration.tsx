import Layout from "../components/Layout/Layout";
import ApiIntegrationCard from "../components/Card/ApiIntegrationCard";



const APIIntegration= () => {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 w-screen px-6 sm:12 md:px-32 py-9">
        <ApiIntegrationCard />
      </div>
    </Layout>
  );
};

export default APIIntegration;
