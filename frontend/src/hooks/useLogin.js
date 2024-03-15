import { useState } from "react";

export default function useLogin(url, navigate) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (object) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
        const userError = await response.json();
        setError(userError.error);
        setIsLoading(false);
        return error;
      }

      const user = await response.json();
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);

      // Navigate only if login is successful
      navigate("/");
      
      // Return any data you want (or nothing)
      return user;
    } catch (error) {
      setError("An error occurred while logging in.");
      setIsLoading(false);
      return error;
    }
  };

  return { login, isLoading, error };
}
