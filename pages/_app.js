import Layout from "../components/Layout";
import "../styles/globals.css";

function SynthetixProposals({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default SynthetixProposals;
