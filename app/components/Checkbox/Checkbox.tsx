import React, { useId } from "react";
import styles from "./Checkbox.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

interface BaseCheckboxProps {
  label: string;
  name?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

interface ControlledCheckboxProps extends BaseCheckboxProps {
  checked: boolean;
  onCheckboxChange: (checked: boolean) => void;
}

interface UncontrolledCheckboxProps extends BaseCheckboxProps {
  value?: string;
}

export type CheckboxProps = ControlledCheckboxProps | UncontrolledCheckboxProps;

const isControlledCheckbox = (
  props: CheckboxProps
): props is ControlledCheckboxProps => {
  return "checked" in props;
};

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const id = useId();

  return (
    <div className="checkbox-wrapper">
      {isControlledCheckbox(props) ? (
        <input
          id={id}
          type="checkbox"
          checked={props.checked}
          onChange={(e) => props.onCheckboxChange(e.target.checked)}
          name={props.name}
        />
      ) : (
        <input id={id} type="checkbox" name={props.name} value={props.value} />
      )}
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

Checkbox.links = links;
