import React from "react";
import { useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { Box, Text } from "~/components";
import { getUser } from "~/session.server";
import type { V2_MetaFunction } from "@remix-run/node";

export const links: LinksFunction = () => [];

export const meta: V2_MetaFunction = () => [{ title: "My Account" }];

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    const searchParams = new URLSearchParams();
    searchParams.append("redirectTo", "/my-account");

    return redirect(`/login?${searchParams}`);
  }

  return json({
    user,
  });
};

export default function MyAccount(): JSX.Element {
  const { user } = useLoaderData();
  return (
    <main>
      <Box>
        <h1>My Account</h1>
        <pre>{JSON.stringify(user, undefined, 2)}</pre>
      </Box>
      <Box>
        <Text>TODO: Add support for password resets</Text>
        <Text>TODO: Add support for changing email addresses</Text>
        <Text>TODO: Add support for changing username</Text>
        <Text>TODO: Add a button (with modal) to delete my account</Text>
      </Box>
    </main>
  );
}
