import React from "react";
import { useLoaderData } from "@remix-run/react";
import type {
  LinksFunction,
  LoaderArgs,
  TypedResponse,
} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { Box, Heading, InternalLink, Text } from "~/components";
import { getUser } from "~/session.server";
import type { V2_MetaFunction } from "@remix-run/node";
import type { Item, User } from "@prisma/client";
import { getItemsByUserId } from "~/models/item.server";

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
  const user = await getUser(request);

  if (!user) {
    const searchParams = new URLSearchParams();
    searchParams.append("redirectTo", "/my-account");

    return redirect(`/login?${searchParams}`);
  }

  const items = await getItemsByUserId(user.id);

  return json({
    user,
    items,
  });
};

export default function MyAccount(): JSX.Element {
  const { user, items } = useLoaderData<typeof loader>();
  return (
    <main>
      <Box>
        <Heading>My Account</Heading>
        <pre>{JSON.stringify(user, undefined, 2)}</pre>
      </Box>
      <Box>
        <h2>My Items</h2>
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
      <Box>
        <h2>Generic todos</h2>
        <Text>
          TODO: Make a subheading component and swap it in for the h2s on this
          page
        </Text>
        <Text>TODO: Add support for password resets</Text>
        <Text>TODO: Add support for changing email addresses</Text>
        <Text>TODO: Add support for changing username</Text>
        <Text>TODO: Add a button (with modal) to delete my account</Text>
      </Box>
    </main>
  );
}
