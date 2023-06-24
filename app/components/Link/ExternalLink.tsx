import React from "react";
import {
  AcceptableContrastRatios,
  getContrastColor,
} from "../__internal__/colorContrastUtils";
import { useBoxContext } from "../Box/Box";

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  newTab?: boolean;
}

export const ExternalLink = ({
  children,
  newTab,
  ...rest
}: ExternalLinkProps) => {
  const { backgroundColor } = useBoxContext();

  const newTabProps = newTab
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a
      {...rest}
      {...newTabProps}
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
    </a>
  );
};
