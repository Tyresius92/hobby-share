import React from "react";
import { Outlet } from "@remix-run/react";
import { Box } from "~/components";
import type { LinksFunction } from "@remix-run/server-runtime";

export const links: LinksFunction = () => [];

export default function AuthLayout() {
  return (
    <Box mx={8} my={4}>
      <Outlet />
    </Box>
  );
}
