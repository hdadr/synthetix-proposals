import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import ProposalMetadataHeader from "../../components/ProposalMetadataHeader";
import { MARKDOWN_METADATA_FIELDS, SIPS_FOLDER_PATH } from "../../utils/constants";
import markdownToHtml, { getAllMarkdowns, getMarkdownBySlug } from "../../utils/markdown";
import styles from "./sips.module.scss";
import Image from "next/image";
import { default as Link } from "../../components/StyledLink";

const SipPage = ({ sip }) => {
  return (
    <>
      <h1>
        {`SIP-${sip.sip}: ${sip.title}`}
        <Link href="" rel="nofollow">
          {" "}
          <Image src="/outline_link_black_24dp.png" alt="source" width={24} height={24} />
        </Link>
      </h1>

      <div className={styles.tableContainer}>
        <ProposalMetadataHeader
          author={sip.author}
          discussionsTo={sip["discussions-to"]}
          status={sip.status}
          created={sip.created}
          updated={sip.updated}
          requires={sip.requires}
          proposalType="sip"
        />
      </div>

      <ReactMarkdown components={CodeBlock} skipHtml>
        {sip.contentMarkdown}
      </ReactMarkdown>
    </>
  );
};

export default SipPage;

export function getStaticProps({ params }) {
  const sip = getMarkdownBySlug(params.sip, SIPS_FOLDER_PATH, MARKDOWN_METADATA_FIELDS);
  const contentHtml = markdownToHtml(sip.content || "");

  return {
    props: {
      sip: {
        ...sip,
        created: sip.created ? sip.created.toString() : null,
        updated: sip.updated ? sip.updated.toString() : null,
        contentHtml,
        contentMarkdown: sip.content,
      },
    },
  };
}

export function getStaticPaths() {
  const proposalsNumber = getAllMarkdowns(SIPS_FOLDER_PATH, ["sip"]);

  return {
    paths: proposalsNumber.map((proposal) => ({
      params: {
        sip: `sip-${proposal.sip.toString()}`,
      },
    })),
    fallback: false,
  };
}
