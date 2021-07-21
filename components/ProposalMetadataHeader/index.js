import styles from "./proposal-metadata-header.module.scss";
import { default as Link } from "../StyledLink";
import FormatAuthorToLink from "../FormatAuthorToLink";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().substr(0, 10);
};

const isValidDate = (dateString) => {
  return !!Date.parse(dateString);
};

const ProposalMetadataHeader = ({ author, discussionsTo, status, created, updated, requires }) => {
  return (
    <>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={`${styles.tableCell} ${styles.tableHead}`}>Author</th>
            <td className={styles.tableCell}>
              <FormatAuthorToLink author={author} />
            </td>
          </tr>

          <tr>
            <th className={`${styles.tableCell} ${styles.tableHead}`}>Discussions-To</th>
            <td className={styles.tableCell}>
              <Link href={discussionsTo}>{discussionsTo}</Link>
            </td>
          </tr>

          <tr>
            <th className={`${styles.tableCell} ${styles.tableHead}`}>Status</th>
            <td className={styles.tableCell}>{status}</td>
          </tr>

          <tr>
            <th className={`${styles.tableCell} ${styles.tableHead}`}>Created</th>
            <td className={styles.tableCell}>{formatDate(created)}</td>
          </tr>

          {isValidDate(updated) ? (
            <tr>
              <th className={`${styles.tableCell} ${styles.tableHead}`}>Updated</th>
              <td className={styles.tableCell}>{formatDate(updated)}</td>
            </tr>
          ) : null}
          {requires ? (
            <tr>
              <th className={`${styles.tableCell} ${styles.tableHead}`}>Requires</th>
              <td className={styles.tableCell}>
                <Link href={`/sips/${requires.toLowerCase()}`}>{requires}</Link>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
};

export default ProposalMetadataHeader;
