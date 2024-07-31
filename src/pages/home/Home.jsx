import React, { useContext, useState } from "react";
import styles from "./Home.module.css";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionForm/TransactionList";
import { useCollection } from "../../hooks/useCollection";
import { AuthContext } from "../../context/AuthContext";
import { orderBy, where } from "firebase/firestore";

const Home = () => {
  const [filter, setFilter] = useState("7days");
  const [sortOrder, setSortOrder] = useState("asc");
  const { user } = useContext(AuthContext);
  const { documents, error, fetchCollection } = useCollection(
    "transactions",
    where("userId", "==", user.uid),
    orderBy("createdAt", sortOrder)
  );

  const handlSort = (sortType) => {
    setSortOrder(sortType);
    fetchCollection({
      fetchQuery: orderBy("createdAt", sortType),
      fetchOrder: where("userId", "==", user.uid),
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles["transactions-actions"]}>
          <ul className={styles.filter}>
            <li>за 1 день</li>
            <li>за 7 дней</li>
            <li>за 1 месяц</li>
          </ul>
          <ul className={styles.sort}>
            <li onClick={() => handlSort("desc")}>новые</li>
            <li onClick={() => handlSort("asc")}>старые</li>
          </ul>
        </div>
        <div className={styles.content}>
          {error && <p>{error}</p>}
          {documents && <TransactionList transactions={documents} />}
        </div>
      </div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
