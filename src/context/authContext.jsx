import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";
import BottomNavbar from "../components/BottomNavbar";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const setAuth = (value) => {
    setIsAuth(value);
  };

  const setVendor = (value) => {
    setVendorId(value);
  };

  const fetchUserAndVendor = async () => {
    setIsLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.log("fuck");
        throw new Error("Error getting session:", error);
      }

      if (session) {
        const { access_token, refresh_token } = session;
        await supabase.auth.setSession({ access_token, refresh_token });
      }

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        throw new Error("Error fetching user:", userError);
      }

      const user_id = userData?.user?.id;
      setUserId(user_id);

      if (user_id) {
        setIsAuth(true);
      }
    } catch (error) {
      console.error("Unexpected error fetching user and vendor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndVendor();
  }, [isAuth]);

  console.log({ userId, vendorId, isLoading, isAuth });

  return (
    <AuthContext.Provider
      value={{
        userId,
        vendorId,
        isLoading,
        isAuth,
        setVendorId,
        setAuth,
        setVendor,
      }}
    >
      {children}
      {isAuth && !!vendorId && <BottomNavbar />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
