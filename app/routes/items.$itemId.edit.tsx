import { Form, useLoaderData } from "@remix-run/react";
import type {
  ActionArgs,
  LoaderArgs,
  TypedResponse,
} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import React from "react";
import { Box, Button, Heading, TextInput } from "~/components";
import type { Item } from "~/models/item.server";
import { getItemById, updateItem } from "~/models/item.server";
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

interface ErrorData {
  itemName: string | null;
  description: string | null;
}

export const action = async ({
  request,
  params,
}: ActionArgs): Promise<
  TypedResponse<{
    errors?: ErrorData;
  }>
> => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const { itemId } = params;
  if (!itemId) {
    throw new Error("No itemId param set");
  }

  const itemName = formData.get("itemName");
  const description = formData.get("description");

  if (typeof itemName !== "string" || itemName.length === 0) {
    return json(
      {
        errors: {
          itemName: "Item name is required",
          description: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof description !== "string" || description.length === 0) {
    return json(
      {
        errors: {
          itemName: null,
          description: "description is required",
        },
      },
      { status: 400 }
    );
  }

  const item = await updateItem(itemId, {
    name: itemName,
    description,
    ownerId: userId,
  });
  return redirect(`/items/${item.id}`);
};

export default function EditItem(): JSX.Element {
  const { item } = useLoaderData();

  return (
    <Box>
      <Heading>Edit item</Heading>
      <Form method="post">
        <TextInput
          label="Item Name"
          name="itemName"
          type="text"
          defaultValue={item.name}
        />
        <TextInput
          label="Item Description"
          name="description"
          type="text"
          defaultValue={item.description}
        />
        <Button type="submit">Save Item</Button>
      </Form>
    </Box>
  );
}
