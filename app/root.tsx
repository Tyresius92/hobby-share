import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Form,
  Link,
} from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import { getUser } from "~/session.server";
import themeStyles from "~/theme.css";
import rootStyles from "~/root.css";
import resetStyles from "~/reset.css";
import { Flex, Text } from "./components";
import {
  AcceptableContrastRatios,
  getContrastColor,
} from "./components/__internal__/colorContrastUtils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetStyles },
  { rel: "stylesheet", href: themeStyles },
  ...Flex.links(),
  ...Text.links(),
  { rel: "stylesheet", href: rootStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  const user = useOptionalUser();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav
          id="global-nav"
          className="navbar"
          style={
            {
              "--navbar-contrast-color": getContrastColor(
                "primary",
                "white",
                AcceptableContrastRatios.TEXT
              ),
            } as React.CSSProperties
          }
        >
          <Flex
            bg="primary"
            gap={2}
            px={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <h1 className="site-title">Hobby Share</h1>
            </div>

            <Flex gap={2} alignItems="center">
              {user ? (
                <>
                  <Text>Hello {user.firstName}!</Text>
                  <Form action="/logout" method="post">
                    <button className="navbar-logout-button" type="submit">
                      Logout
                    </button>
                  </Form>
                </>
              ) : (
                <>
                  <Link to="/join" className="navbar-link">
                    Sign up
                  </Link>
                  <Link to="/login" className="navbar-link">
                    Log In
                  </Link>
                </>
              )}
            </Flex>
          </Flex>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
