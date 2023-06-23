import React from "react";
import styles from "./Heading.css";
import type { LinksFunction } from "@remix-run/server-runtime";
import { AcceptableContrastRatios } from "../__internal__/colorContrastUtils";
import { useBoxContext } from "../Box/Box";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export interface HeadingProps {
  children: React.ReactNode;
}

export const Heading = ({ children }: HeadingProps): JSX.Element => {
  const { getContrastColor } = useBoxContext();

  return (
    <h1
      className="heading-component"
      style={
        {
          "--heading-contrast-color": `var(--color-${getContrastColor(
            ["gray-200", "gray-100"],
            AcceptableContrastRatios.TEXT
          )})`,
        } as React.CSSProperties
      }
    >
      {children}
    </h1>
  );
};
