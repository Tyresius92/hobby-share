import React from "react";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useBoxContext } from "../Box/Box";
import {
  AcceptableContrastRatios,
  getContrastColor,
} from "../__internal__/colorContrastUtils";

export interface InternalLinkProps extends Omit<LinkProps, "className"> {
  children: React.ReactNode;
}

export const InternalLink = ({
  children,
  ...rest
}: InternalLinkProps): JSX.Element => {
  const { backgroundColor } = useBoxContext();

  return (
    <Link
      {...rest}
      className="link-component"
      style={
        {
          "--link-contrast-color": `var(--color-${getContrastColor(
            backgroundColor,
            "primary",
            AcceptableContrastRatios.TEXT
          )})`,
        } as React.CSSProperties
      }
    >
      {children}
    </Link>
  );
};
