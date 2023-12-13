"use client";
import { theme } from "@/components/common/theme";
import NavBar from "@/components/navBar";
import AuthContextProvider from "@/contexts/AuthContext";
import { ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname();

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        {pathName !== "/auth" && <NavBar />}

        {children}
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MainLayout;
