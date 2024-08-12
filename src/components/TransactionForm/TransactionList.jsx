import { ru } from "date-fns/locale"

import { formatDistanceToNow } from "date-fns";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Transaction.module.css";

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("transactions");

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <div>
          <p className={styles.name}>{transaction.name}</p>
          <span> {formatDistanceToNow(new Date(transaction.createdAt.toDate()), { addSuffix: true, locale: ru })}</span>
          </div>
          <p className={styles.amount}>{transaction.amount}$</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}