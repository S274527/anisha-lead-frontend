"use client";
import React, { useEffect } from "react";
import { useSession } from "@/hooks";

export const Empty = () => {
  const { logout } = useSession();

  useEffect(() => {
    logout(false);
  }, []);

  return <></>;
};
