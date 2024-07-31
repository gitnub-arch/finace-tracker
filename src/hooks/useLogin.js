import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!response) {
        setError("Не получилось создать пользователя");
      }

      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, login };
};
