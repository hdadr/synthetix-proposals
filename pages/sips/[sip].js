import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import { MARKDOWN_METADATA_FIELDS } from "../../utils/constants";
import markdownToHtml, { getAllMarkdowns, getMarkdownBySlug } from "../../utils/markdown";

const SIPS_FOLDER_PATH = "content/SIPs";

const SipPage = ({ sip }) => {
  return (
    <>
      <ReactMarkdown components={CodeBlock} skipHtml>
        {sip.contentMarkdown}
      </ReactMarkdown>
    </>
  );
};

export default SipPage;

export function getStaticProps({ params }) {
  const slug = `sip-${params.sip}`;
  const sip = getMarkdownBySlug(slug, SIPS_FOLDER_PATH, MARKDOWN_METADATA_FIELDS);
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
        sip: proposal.sip.toString(),
      },
    })),
    fallback: false,
  };
}
