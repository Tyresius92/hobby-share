import React from "react";
import styles from "./Button.css";

export interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "type"
  > {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
}

export const links = () => [{ rel: "stylesheet", href: styles }];

export const Button = ({
  children,
  onClick,
  variant = "primary",
}: ButtonProps): JSX.Element => {
  return (
    <button className={`button btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
