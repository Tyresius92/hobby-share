import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import { Box, Heading } from "~/components";
import { getItemById } from "~/models/item.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { itemId } = params;
  if (!itemId) {
    throw new Error("No itemId param set");
  }

  const item = await getItemById(itemId);

  return json({
    item,
  });
};

export default function ItemDetailsPage() {
  const { item } = useLoaderData();

  return (
    <Box>
      <Heading>Item Details</Heading>
      <pre>{JSON.stringify(item, undefined, 2)}</pre>
    </Box>
  );
}
