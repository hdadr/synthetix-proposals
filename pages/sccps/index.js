import React from "react";
import Table, { TableData, TableRow } from "../../components/Table";
import { tableContainer } from "./sccps.module.scss";
import { default as Link } from "../../components/StyledLink";
import { getAllMarkdowns } from "../../utils/markdown";
import { MARKDOWN_METADATA_FIELDS, SCCPS_FOLDER_PATH } from "../../utils/constants";
import FormatAuthorToLink from "../../components/FormatAuthorToLink";

const sortBySCCPNumber = (md1, md2) => {
  if (!md1 || !md2) return -1;
  return md1.sccp > md2.sccp ? -1 : 1;
};

const draft = (sccp) => sccp.status.toLowerCase() === "draft";
const feasibility = (sccp) => sccp.status.toLowerCase() === "feasibility";
const votePending = (sccp) => sccp.status.toLowerCase() === "vote_pending";
const approved = (sccp) => sccp.status.toLowerCase() === "approved";
const rejected = (sccp) => sccp.status.toLowerCase() === "rejected";
const implemented = (sccp) => sccp.status.toLowerCase() === "implemented";

const SCCPsPage = ({ allSCCPs = [] }) => {
  const SCCPsGroupedByStatus = [
    { name: "Draft", sccps: allSCCPs.filter(draft).sort(sortBySCCPNumber) },
    { name: "Vote Pending", sccps: allSCCPs.filter(votePending).sort(sortBySCCPNumber) },
    { name: "Feasibility", sccps: allSCCPs.filter(feasibility).sort(sortBySCCPNumber) },
    { name: "Approved", sccps: allSCCPs.filter(approved).sort(sortBySCCPNumber) },
    { name: "Rejected", sccps: allSCCPs.filter(rejected).sort(sortBySCCPNumber) },
    { name: "Implemented", sccps: allSCCPs.filter(implemented).sort(sortBySCCPNumber) },
  ];

  return (
    <>
      <h1>All SCCPs</h1>

      {SCCPsGroupedByStatus.map((group) => {
        return (
          <React.Fragment key={group.name}>
            <h2>{group.name}</h2>
            <div className={tableContainer}>
              <Table theads={["Number", "Title", "Author"]}>
                {group.sccps.map((proposal) => {
                  return (
                    <TableRow key={proposal.sccp}>
                      <TableData>
                        <Link href={`/sccps/sccp-${proposal.sccp}`}>{proposal.sccp}</Link>
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

export default SCCPsPage;

export async function getStaticProps() {
  const allSCCPs = getAllMarkdowns(SCCPS_FOLDER_PATH, MARKDOWN_METADATA_FIELDS);

  return {
    props: {
      allSCCPs: allSCCPs.map((sccp) => {
        return {
          ...sccp,
          created: sccp.created ? sccp.created.toString() : null,
          updated: sccp.updated ? sccp.updated.toString() : null,
        };
      }),
    },
  };
}
