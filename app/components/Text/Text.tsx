import React from "react";
import styles from "./Text.css";
import type { LinksFunction } from "@remix-run/server-runtime";
import { useBoxContext } from "../Box/Box";
import {
  AcceptableContrastRatios,
  getContrastColor,
} from "../__internal__/colorContrastUtils";

export interface TextProps {
  children: React.ReactNode;
}

const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const Text = (props: TextProps): JSX.Element => {
  const { backgroundColor } = useBoxContext();

  console.log(backgroundColor);

  return (
    <p
      className="text-component"
      style={
        {
          "--text-contrast-color": `var(--color-${getContrastColor(
            backgroundColor,
            ["gray-200", "gray-100"],
            AcceptableContrastRatios.TEXT
          )})`,
        } as React.CSSProperties
      }
    >
      {props.children}
    </p>
  );
};

Text.links = links;
