import React, { useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  TypedResponse,
} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import {
  AlertModal,
  Box,
  Button,
  Flex,
  Heading,
  InternalLink,
  Subheading,
  Text,
  TextInput,
} from "~/components";
import type { V2_MetaFunction } from "@remix-run/node";
import type { Item, User } from "@prisma/client";
import { getItemsByUserId } from "~/models/item.server";
import { requireUser } from "~/session.server";
import { deleteUserByEmail } from "~/models/user.server";

export const links: LinksFunction = () => [];

export const meta: V2_MetaFunction = () => [{ title: "My Account" }];

export const loader = async ({
  request,
}: LoaderArgs): Promise<
  TypedResponse<{
    user: User;
    items: Item[];
  }>
> => {
  const searchParams = new URLSearchParams();
  searchParams.append("redirectTo", "/my-account");

  const user = await requireUser(request, `/login?${searchParams}`);

  const items = await getItemsByUserId(user.id);

  return json({
    user,
    items,
  });
};

export const action = async ({
  request,
}: ActionArgs): Promise<TypedResponse<null>> => {
  const user = await requireUser(request);

  await deleteUserByEmail(user.email);

  return redirect("/");
};

export default function MyAccount(): JSX.Element {
  const { user, items } = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <Box>
        <Heading>My Account</Heading>
        <pre>{JSON.stringify(user, undefined, 2)}</pre>
      </Box>
      <AlertModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={<Button variant="danger">Delete account</Button>}
        title="Delete account"
        message="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        body={
          <Box>
            <Form method="post">
              <TextInput
                label="Type DELETE in this box"
                name="deleteVerification"
                type="text"
                pattern="DELETE"
                required
              />
              <Flex justifyContent="flex-end" gap={3}>
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" type="submit">
                  Yes, Delete My Account
                </Button>
              </Flex>
            </Form>
          </Box>
        }
      />
      <Box>
        <Subheading>My Items</Subheading>
        <Text>
          <InternalLink to="/items">See all items</InternalLink>
        </Text>
        <Box>
          {items.length === 0 ? (
            <Text>
              You have no items yet.{" "}
              <InternalLink to="/items/new">
                Create your first item
              </InternalLink>
            </Text>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <InternalLink to={`/items/${item.id}`}>
                    {item.name}
                  </InternalLink>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </main>
  );
}
