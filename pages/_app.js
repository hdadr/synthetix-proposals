import Layout from "../components/Layout";
import "../styles/globals.scss";

function SynthetixProposals({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default SynthetixProposals;
