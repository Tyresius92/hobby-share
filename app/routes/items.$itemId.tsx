import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs, TypedResponse } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import { Box, Heading } from "~/components";
import type { Item } from "~/models/item.server";
import { getItemById } from "~/models/item.server";

export const loader = async ({
  params,
}: LoaderArgs): Promise<TypedResponse<{ item: Item | null }>> => {
  const { itemId } = params;
  if (!itemId) {
    throw new Error("No itemId param set");
  }

  const item = await getItemById(itemId);

  return json({
    item,
  });
};

export default function ItemDetailsPage(): JSX.Element {
  const { item } = useLoaderData();

  return (
    <Box>
      <Heading>Item Details</Heading>
      <pre>{JSON.stringify(item, undefined, 2)}</pre>
    </Box>
  );
}
