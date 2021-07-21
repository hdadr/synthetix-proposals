import React from "react";
import Table, { TableData, TableRow } from "../../components/Table";
import { tableContainer } from "./sips.module.scss";
import { default as Link } from "../../components/StyledLink";
import { getAllMarkdowns } from "../../utils/markdown";
import { formatAuthor } from "../../utils/formatAuthor";
import { MARKDOWN_METADATA_FIELDS } from "../../utils/constants";
import FormatAuthorToLink from "../../components/FormatAuthorToLink";

const sortBySipNumber = (md1, md2) => {
  if (!md1 || !md2) return -1;
  return md1.sip > md2.sip ? -1 : 1;
};

const draft = (sip) => sip.status.toLowerCase() === "draft";
const feasibility = (sip) => sip.status.toLowerCase() === "feasibility";
const approved = (sip) => sip.status.toLowerCase() === "approved";
const rejected = (sip) => sip.status.toLowerCase() === "rejected";
const implemented = (sip) => sip.status.toLowerCase() === "implemented";

const SIPsPage = ({ allSIPs = [] }) => {
  const SIPsGroupedByStatus = [
    { name: "Draft", sips: allSIPs.filter(draft).sort(sortBySipNumber) },
    { name: "Feasibility", sips: allSIPs.filter(feasibility).sort(sortBySipNumber) },
    { name: "Approved", sips: allSIPs.filter(approved).sort(sortBySipNumber) },
    { name: "Rejected", sips: allSIPs.filter(rejected).sort(sortBySipNumber) },
    { name: "Implemented", sips: allSIPs.filter(implemented).sort(sortBySipNumber) },
  ];

  return (
    <>
      <h1>All SIPs</h1>

      {SIPsGroupedByStatus.map((group) => {
        return (
          <React.Fragment key={group.name}>
            <h2>{group.name}</h2>
            <div className={tableContainer}>
              <Table theads={["Number", "Title", "Author"]}>
                {group.sips.map((proposal) => {
                  return (
                    <TableRow key={proposal.sip}>
                      <TableData>
                        <Link href={`/sips/${proposal.sip}`}>{proposal.sip}</Link>
                      </TableData>

                      <TableData>{proposal.title}</TableData>

                      <TableData>
                        <FormatAuthorToLink author={proposal.author} />
                      </TableData>
                    </TableRow>
                  );
                })}
              </Table>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default SIPsPage;

export async function getStaticProps() {
  const allSIPs = getAllMarkdowns("content/SIPs", MARKDOWN_METADATA_FIELDS);

  return {
    props: {
      allSIPs: allSIPs.map((sip) => {
        return {
          ...sip,
          created: sip.created ? sip.created.toString() : null,
          updated: sip.updated ? sip.updated.toString() : null,
        };
      }),
    },
  };
}
