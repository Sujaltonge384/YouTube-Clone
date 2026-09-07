import { createContext, useContext, useState } from "react";


// Create the authentication context
const AuthContext = createContext();


// ======================================================
// AUTH PROVIDER
// ======================================================

export function AuthProvider({ children }) {

  // Get previously stored user from localStorage
  const storedUser = localStorage.getItem("user");

  // Store the logged-in user
  const [user, setUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );


  // ======================================================
  // LOGIN
  // ======================================================

  const login = (userData, token) => {

    // Save JWT token
    localStorage.setItem("token", token);

    // Save user information
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    // Update React state
    setUser(userData);
  };


  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = () => {

    // Remove authentication information
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear React state
    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// ======================================================
// CUSTOM HOOK
// ======================================================

export function useAuth() {
  return useContext(AuthContext);
}