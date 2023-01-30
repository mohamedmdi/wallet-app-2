import { useState, useEffect } from "react";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  function logIn(user) {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("user", JSON.stringify(user))
  }

  function logOut() {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  return { isAuthenticated, logIn, logOut, loading };
}

export default useAuth;
