import React from "react";
import { Outlet } from "@remix-run/react";
import { Box } from "~/components";

export const links = () => [];

export default function AuthLayout() {
  return (
    <Box mx={8} my={4}>
      <Outlet />
    </Box>
  );
}
