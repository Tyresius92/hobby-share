import React, { useId } from "react";
import styles from "./TextInput.css";
import { useBoxContext } from "../Box/Box";
import { AcceptableContrastRatios } from "../__internal__/colorContrastUtils";
import type { LinksFunction } from "@remix-run/server-runtime";

interface BaseTextInputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "required" | "autoFocus" | "autoComplete" | "placeholder"
  > {
  label: string;
  hiddenLabel?: boolean;
  name: string;
  type: "text" | "email" | "password";

  errorMessage?: string;
}

interface ControlledTextInputProps extends BaseTextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface UncontrolledTextInputProps extends BaseTextInputProps {}

export type TextInputProps =
  | ControlledTextInputProps
  | UncontrolledTextInputProps;

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const TextInputWithForwardedRef = React.forwardRef(
  (
    { label, hiddenLabel, errorMessage, ...rest }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const inputId = useId();
    const errorId = useId();
    const { getContrastColor } = useBoxContext();

    return (
      <div className="text-input-wrapper">
        <label
          htmlFor={inputId}
          className={`text-input-label ${
            hiddenLabel ? ".visually-hidden" : ""
          }`}
          style={
            {
              "--text-input-contrast-color": `var(--color-${getContrastColor(
                ["gray-200", "gray-100"],
                AcceptableContrastRatios.TEXT
              )})`,
            } as React.CSSProperties
          }
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          aria-describedby={errorId}
          aria-invalid={errorMessage ? true : undefined}
          className="text-input-input"
          // using spread here to get value and onchange for free
          {...rest}
        />
        {errorMessage && (
          <div id={errorId} className="text-input-error-message">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);
TextInputWithForwardedRef.displayName = "TextInputWithForwardedRef";

export const TextInput = Object.assign(
  TextInputWithForwardedRef,

  // HACK: in order to expose these extra components as properties on
  // `TextInput`, we need to `Object.assign` them to the return value of
  // `React.forwardRef`.
  //
  // The reason the `MyComponent.ChildComponent` pattern works elsewhere is that
  // TS _can_ automatically merge property declarations like that into the
  // type of a function, but only if:
  //
  //   - the properties are declared in the same scope as the function itself
  //   - the function is not implicitly or explicitly typed as something else
  //
  // Here, the component is being defined as an argument of `React.forwardRef`,
  // so the value we're assigning to `TextInput` is the return type of the call
  // to `React.forwardRef` (i.e. some big ugly inferred magic), and by default
  // TS will not allow us to declare new properties on that type.
  //
  // By using `Object.assign`, TS creates a new type that merges the return type
  // from `React.forwardRef` with the properties of the object, making them
  // available like other nested components in this library.
  //
  // For consistency, we also define these widgets using our typical pattern
  // below, but note that it's not strictly necessary because the call to
  // Object.assign here makes those declarations redundant.
  //
  // For more information on declaring new properties on functions, see:
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#properties-declarations-on-functions
  {
    // TODO: add icon support
  }
);
