import { collection, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useFirestore = (collectionName) => {
  let ref = collection(db, collectionName);

  const addDocument = async (doc) => {
    try {
      const createdAt = Timestamp.fromDate(new Date());
      await addDoc(ref, { ...doc, createdAt });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteDocument = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.log('error', err.message);
    }
  };

  return { addDocument, deleteDocument };
};
