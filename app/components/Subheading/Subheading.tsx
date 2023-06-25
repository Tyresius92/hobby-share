import React from "react";
import styles from "./Subheading.css";
import type { LinksFunction } from "@remix-run/server-runtime";
import { AcceptableContrastRatios } from "../__internal__/colorContrastUtils";
import { useBoxContext } from "../Box/Box";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export interface SubheadingProps {
  children: React.ReactNode;
}

export const Subheading = ({ children }: SubheadingProps): JSX.Element => {
  const { getContrastColor } = useBoxContext();

  return (
    <h2
      className="subheading-component"
      style={
        {
          "--subheading-contrast-color": `var(--color-${getContrastColor(
            ["gray-200", "gray-100"],
            AcceptableContrastRatios.LARGE_TEXT
          )})`,
        } as React.CSSProperties
      }
    >
      {children}
    </h2>
  );
};
