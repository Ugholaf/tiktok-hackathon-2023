import "./App.css";
import Layout from "./components/Layout/Layout";

function App() {
  const isLogin = true;
  return (
    <>
      <Layout isLogin={isLogin}>
        <div>body</div>
      </Layout>
    </>
  );
}

export default App;
