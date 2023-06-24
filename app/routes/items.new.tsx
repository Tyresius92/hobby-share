import { Form } from "@remix-run/react";
import type {
  ActionArgs,
  LoaderFunction,
  TypedResponse,
} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import { Box, Button, Heading, TextInput } from "~/components";
import { createItem } from "~/models/item.server";
import { requireUser, requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);

  return json({ ok: true });
};

interface ErrorData {
  itemName: string | null;
  description: string | null;
}

export const action = async ({
  request,
}: ActionArgs): Promise<
  TypedResponse<{
    errors?: ErrorData;
  }>
> => {
  console.log("i was called");

  const userId = await requireUserId(request);
  const formData = await request.formData();

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

  const todo = await createItem({
    name: itemName,
    description,
    ownerId: userId,
  });
  return redirect(`/items/${todo.id}`);
};

export default function NewItem() {
  return (
    <Box mx={8} my={4}>
      <Heading>Create an item</Heading>
      <Form method="post">
        <TextInput label="Item Name" name="itemName" type="text" />
        <TextInput label="Item Description" name="description" type="text" />
        <Button type="submit">Create Item</Button>
      </Form>
    </Box>
  );
}
