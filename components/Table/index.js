import styles from "./table.module.scss";

export const TableRow = ({ children }) => <tr className={styles.tr}>{children}</tr>;
export const TableData = ({ children }) => <td className={styles.tableCell}>{children}</td>;

const Table = ({ children, theads = [], backgroundColor = "white" }) => {
  return (
    <table className={styles.table} style={{ backgroundColor }}>
      <thead className={styles.thead}>
        <TableRow>
          {theads.map((thead) => (
            <th className={`${styles.th} ${styles.tableCell}`} key={thead}>
              {thead}
            </th>
          ))}
        </TableRow>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
