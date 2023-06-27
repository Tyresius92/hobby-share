import { Form, useLoaderData } from "@remix-run/react";
import { Button, Flex, Heading, InternalLink } from "~/components";
import type {
  ActionArgs,
  LoaderArgs,
  TypedResponse,
} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
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

export default function ItemDetailsIndex(): JSX.Element {
  const data = useLoaderData();

  return (
    <>
      <Heading>Item Details</Heading>
      <Flex gap={4} mt={4} alignItems="baseline" justifyContent="flex-end">
        <InternalLink to="edit">Edit</InternalLink>
        <Form method="post">
          <Button type="submit" variant="danger">
            Delete Item
          </Button>
        </Form>
      </Flex>
      <pre>{JSON.stringify(data?.item, undefined, 2)}</pre>
    </>
  );
}
