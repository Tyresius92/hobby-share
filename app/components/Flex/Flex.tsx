import { InternalBox, links as boxLinks } from "../Box/Box";
import type { BoxProps, SpaceOption } from "../Box/Box";

import flexStyles from "./Flex.css";

export const links = () => [
  ...boxLinks(),
  { rel: "stylesheet", href: flexStyles },
];

export interface FlexProps extends BoxProps {
  flexDirection?: "row" | "column";
  gap?: SpaceOption;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "center";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline";
}

export const Flex = ({
  children,
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "flex-start",
  gap = 0,
  ...rest
}: FlexProps): JSX.Element => {
  return (
    <InternalBox
      className="flex-component"
      style={
        {
          "--flex-comp-direction": flexDirection,
          "--flex-comp-gap": `var(--space-${gap})`,
          "--flex-comp-justify-content": justifyContent,
          "--flex-comp-align-items": alignItems,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </InternalBox>
  );
};
