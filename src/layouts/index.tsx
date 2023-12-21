"use client";
import { theme } from "@/components/common/theme";
import NavBar from "@/components/navBar";
import AuthContextProvider from "@/contexts/AuthContext";
import ItemsContextProvider from "@/contexts/itemsContext";
import { ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname();

  return (
    <AuthContextProvider>
      <ItemsContextProvider>
        <ThemeProvider theme={theme}>
          {pathName !== "/auth" && <NavBar />}
          {children}
        </ThemeProvider>
      </ItemsContextProvider>
    </AuthContextProvider>
  );
}

export default MainLayout;
