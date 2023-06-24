import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs, TypedResponse } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import { Box, Heading, InternalLink, Text } from "~/components";
import type { Item } from "~/models/item.server";
import { getItemsByUserId } from "~/models/item.server";
import { requireUserId } from "~/session.server";

export const loader = async ({
  request,
}: LoaderArgs): Promise<
  TypedResponse<{
    items: Item[];
  }>
> => {
  const userId = await requireUserId(request);

  const items = await getItemsByUserId(userId);

  return json({
    items,
  });
};

export default function ItemsIndex(): JSX.Element {
  const { items } = useLoaderData<typeof loader>();

  return (
    <Box>
      <Heading>My Items</Heading>
      <InternalLink to="/items/new">Make a new item</InternalLink>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Box>
              <Text>
                <InternalLink to={item.id}>{item.name}</InternalLink>
              </Text>
              <Text>{item.description}</Text>
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
}
