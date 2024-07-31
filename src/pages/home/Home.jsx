import React, { useContext } from "react";
import styles from "./Home.module.css";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionForm/TransactionList";
import { useCollection } from "../../hooks/useCollection";
import { AuthContext } from "../../context/AuthContext";
import { orderBy, where } from "firebase/firestore";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { documents, error } = useCollection(
    "transactions",
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
