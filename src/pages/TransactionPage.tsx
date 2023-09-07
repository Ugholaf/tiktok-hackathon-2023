import Layout from "../components/Layout/Layout";
import TransactionFullCard from "../components/Card/TransactionFullCard";

const TransactionPage = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center gap-4 w-screen px-6 sm:12 md:px-32 py-9">
                <TransactionFullCard />
            </div>
        </Layout>
    );
};

export default TransactionPage;
