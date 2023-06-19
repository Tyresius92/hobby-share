import { NavLink, useLoaderData } from "@remix-run/react";
import {
  LinksFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/server-runtime";
import React from "react";
import { Box } from "~/components";
import { getUser } from "~/session.server";
import { useOptionalUser, useUser } from "~/utils";

export const links: LinksFunction = () => [...Box.links()];

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login?redirectTo=/my-account");
  }

  return json({
    user,
  });
};

export default function MyAccount() {
  const { user } = useLoaderData();
  return (
    <main>
      <Box>
        <h1>My Account</h1>
        <pre>{JSON.stringify(user, undefined, 2)}</pre>
      </Box>
    </main>
  );
}
