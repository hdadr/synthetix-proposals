import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import ProposalMetadataHeader from "../../components/ProposalMetadataHeader";
import { MARKDOWN_METADATA_FIELDS, SCCPS_FOLDER_PATH } from "../../utils/constants";
import markdownToHtml, { getAllMarkdowns, getMarkdownBySlug } from "../../utils/markdown";
import styles from "./sccps.module.scss";
import Image from "next/image";
import { default as Link } from "../../components/StyledLink";

const SccpPage = ({ sccp }) => {
  return (
    <>
      <h1>
        {`SCCP-${sccp.sccp}: ${sccp.title}`}
        <Link href="" rel="nofollow">
          {" "}
          <Image src="/outline_link_black_24dp.png" alt="source" width={24} height={24} />
        </Link>
      </h1>

      <div className={styles.tableContainer}>
        <ProposalMetadataHeader
          author={sccp.author}
          discussionsTo={sccp["discussions-to"]}
          status={sccp.status}
          created={sccp.created}
          updated={sccp.updated}
          requires={sccp.requires}
        />
      </div>

      <ReactMarkdown components={CodeBlock} skipHtml>
        {sccp.contentMarkdown}
      </ReactMarkdown>
    </>
  );
};

export default SccpPage;

export function getStaticProps({ params }) {
  const sccp = getMarkdownBySlug(params.sccp, SCCPS_FOLDER_PATH, MARKDOWN_METADATA_FIELDS);
  const contentHtml = markdownToHtml(sccp.content || "");

  return {
    props: {
      sccp: {
        ...sccp,
        created: sccp.created ? sccp.created.toString() : null,
        updated: sccp.updated ? sccp.updated.toString() : null,
        contentHtml,
        contentMarkdown: sccp.content,
      },
    },
  };
}

export function getStaticPaths() {
  const proposalsNumber = getAllMarkdowns(SCCPS_FOLDER_PATH, ["sccp"]);

  return {
    paths: proposalsNumber.map((proposal) => ({
      params: {
        sccp: `sccp-${proposal.sccp.toString()}`,
      },
    })),
    fallback: false,
  };
}
