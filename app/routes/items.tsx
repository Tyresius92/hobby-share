import { Outlet } from "@remix-run/react";
import React from "react";
import { Box } from "~/components";

export default function ItemsPageLayout(): JSX.Element {
  return (
    <Box mx={8} my={4}>
      <Outlet />
    </Box>
  );
}
