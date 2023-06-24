import React from "react";
import { useOptionalUser } from "~/utils";
import { Box } from "../Box/Box";
import {
  AcceptableContrastRatios,
  getContrastColor,
} from "../__internal__/colorContrastUtils";
import { Flex } from "../Flex/Flex";
import { Form, Link } from "@remix-run/react";
import { Text } from "../Text/Text";
import styles from "./Navbar.css";
import type { LinksFunction } from "@remix-run/server-runtime";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const Navbar = (): JSX.Element => {
  const user = useOptionalUser();

  return (
    <Box bg="primary">
      <nav
        id="global-nav"
        className="navbar"
        style={
          {
            "--navbar-contrast-color": `var(--color-${getContrastColor(
              "primary",
              "white",
              AcceptableContrastRatios.TEXT
            )})`,
          } as React.CSSProperties
        }
      >
        <Flex gap={2} px={3} justifyContent="space-between" alignItems="center">
          <Box>
            <h1 className="site-title">
              <Link to="/" className="navbar-link">
                <span>H</span>obby <span>S</span>hare
              </Link>
            </h1>
          </Box>

          <Flex gap={2} alignItems="center">
            {user ? (
              <>
                <Text>Hello {user.firstName}!</Text>
                <Link to="/my-account" className="navbar-link">
                  My Account
                </Link>
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
    </Box>
  );
};
