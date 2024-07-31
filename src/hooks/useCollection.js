import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName, _query, _order) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, collectionName);

    // Apply query constraints if provided
    if (_query) {
      ref = query(ref, _query); // Фильтрация
    }

    // Apply ordering constraints if provided
    if (_order) {
      ref = query(ref, _order); // Отсортируй по полю createdAt
    }

    onSnapshot(ref, (snapshot) => {
      let results = [];

      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setDocuments(results);
      setError(null);
    });
  }, [collectionName,  _query, _order]);

  return { documents, error };
};
