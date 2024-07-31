import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);
  
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response) {
        setError("Не получилось создать пользователя");
      }

      await updateProfile(response.user, {
        displayName,
      });

      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
