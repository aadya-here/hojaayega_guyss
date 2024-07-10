import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";
import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "./authContext";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendorId, setVendorId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { setVendor } = useAuth();

  useEffect(() => {
    const storedVendorId = localStorage.getItem("vendorId");
    if (storedVendorId) {
      setVendorId(parseInt(storedVendorId, 10));
      setVendor(parseInt(storedVendorId, 10));
    }
    setIsLoading(false);
  }, []);

  const fetchVendorId = async (vendor_id) => {
    setVendorId(vendor_id);
    try {
      if (vendor_id !== null) {
        localStorage.setItem("vendorId", vendor_id.toString());
      } else {
        localStorage.removeItem("vendorId");
      }
    } catch (error) {
      console.error("Error saving vendor ID:", error);
    }
  };

  return (
    <VendorContext.Provider
      value={{ vendorId, setVendorId: fetchVendorId, isLoading }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error("useVendor must be used within a VendorProvider");
  }
  return context;
};
