import React from "react";
import { Outlet } from "@remix-run/react";
import { Box } from "~/components";

export default function ItemDetailsPage(): JSX.Element {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
