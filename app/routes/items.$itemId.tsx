import { Form, useLoaderData } from "@remix-run/react";
import type {
  ActionArgs,
  LoaderArgs,
  TypedResponse,
} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import { Box, Button, Heading } from "~/components";
import type { Item } from "~/models/item.server";
import { deleteItem } from "~/models/item.server";
import { getItemById } from "~/models/item.server";
import { requireUserId } from "~/session.server";

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

export const action = async ({
  params,
  request,
}: ActionArgs): Promise<TypedResponse<never>> => {
  const ownerId = await requireUserId(request);

  const { itemId } = params;

  if (!itemId) {
    throw new Error("No itemId found");
  }

  await deleteItem({ id: itemId, ownerId });

  return redirect("/my-account");
};

export default function ItemDetailsPage(): JSX.Element {
  const { item } = useLoaderData();

  return (
    <Box my={4} mx={8}>
      <Heading>Item Details</Heading>
      <pre>{JSON.stringify(item, undefined, 2)}</pre>
      <Form method="post">
        <Button type="submit" variant="danger">
          Delete Item
        </Button>
      </Form>
    </Box>
  );
}
