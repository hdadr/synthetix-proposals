import Layout from "../components/layout";
import "../styles/globals.scss";

function SynthetixProposals({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default SynthetixProposals;
