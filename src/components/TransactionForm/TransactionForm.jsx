import { useContext, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { AuthContext } from "../../context/AuthContext";

export default function TransactionForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      name,
      amount,
      userId: user.uid,
    });

    setName('');
    setAmount('');

  };

  return (
    <>
      <h3>Добавить транзакцию</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Название транзакции</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Сумма ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Добавить</button>
      </form>
    </>
  );
}
