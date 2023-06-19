import React, { createContext, useContext } from "react";
import styles from "./Box.css";
import type { ColorVariant } from "~/colors";

const links = () => [{ rel: "stylesheet", href: styles }];

export type SpaceOption =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

export interface InternalBoxProps {
  children: React.ReactNode;
  p?: SpaceOption;
  py?: SpaceOption;
  pt?: SpaceOption;
  pb?: SpaceOption;
  px?: SpaceOption;
  pl?: SpaceOption;
  pr?: SpaceOption;

  m?: SpaceOption;
  my?: SpaceOption;
  mt?: SpaceOption;
  mb?: SpaceOption;
  mx?: SpaceOption;
  ml?: SpaceOption;
  mr?: SpaceOption;

  className?: string;
  style?: React.CSSProperties;

  bg?: ColorVariant;
}

export const InternalBox = ({
  children,
  p = 0,
  px = p,
  py = p,
  pl = px,
  pr = px,
  pt = py,
  pb = py,
  m = 0,
  mx = m,
  my = m,
  ml = mx,
  mr = mx,
  mt = my,
  mb = my,
  bg = undefined,
  className,
  style,
  ...rest
}: InternalBoxProps): JSX.Element => {
  return (
    <div
      className={`box-component ${bg ? "box-component-background" : ""} ${
        className ?? ""
      }`}
      style={
        {
          ...style,
          "--box-comp-padding-block-start": `var(--space-${pt})`,
          "--box-comp-padding-block-end": `var(--space-${pb})`,
          "--box-comp-padding-inline-start": `var(--space-${pl})`,
          "--box-comp-padding-inline-end": `var(--space-${pr})`,
          "--box-comp-margin-block-start": `var(--space-${mt})`,
          "--box-comp-margin-block-end": `var(--space-${mb})`,
          "--box-comp-margin-inline-start": `var(--space-${ml})`,
          "--box-comp-margin-inline-end": `var(--space-${mr})`,
          ...(bg && {
            "--box-comp-background-color": `var(--color-${bg})`,
          }),
        } as React.CSSProperties
      }
      {...rest}
    >
      {bg ? (
        <BoxContext.Provider
          value={{
            backgroundColor: bg,
          }}
        >
          {children}
        </BoxContext.Provider>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export interface BoxProps
  extends Omit<InternalBoxProps, "className" | "style"> {}

interface BoxContextShape {
  backgroundColor: ColorVariant;
}

const BoxContext = createContext<BoxContextShape>({
  backgroundColor: "white",
});

export const useBoxContext = () => useContext(BoxContext);

export const Box = (props: BoxProps): JSX.Element => {
  return <InternalBox {...props} />;
};

Box.links = links;
