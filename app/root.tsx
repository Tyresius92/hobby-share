import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import themeStyles from "~/theme.css";
import resetStyles from "~/reset.css";
import { Box, componentLibraryLinks } from "./components";
import { Navbar } from "./components/Navbar/Navbar";
import type { User } from "@prisma/client";

const poppinsFontUrl =
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap";
const cormorantGaramondFontUrl =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;700&display=swap";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetStyles },
  { rel: "stylesheet", href: themeStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", preconnect: "true" },
  { rel: "stylesheet", href: poppinsFontUrl },
  { rel: "stylesheet", href: cormorantGaramondFontUrl },
  ...componentLibraryLinks(),
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({
  request,
}: LoaderArgs): Promise<
  TypedResponse<{
    user: User | null;
  }>
> => {
  return json({ user: await getUser(request) });
};

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Box bg="gray-100">
          <div id="root">
            <Navbar />
            <Box>
              <Outlet />
            </Box>
          </div>
        </Box>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
