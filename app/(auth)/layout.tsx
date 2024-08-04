import React from "react";
import ProviderComponent from "@/components/layouts/provider-component";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-black dark:text-white-dark">
      <ProviderComponent>{children}</ProviderComponent>
    </div>
  );
};

export default AuthLayout;
