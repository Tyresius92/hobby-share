import React from "react";
import * as RadixDialog from "@radix-ui/react-alert-dialog";
import styles from "./AlertModal.css";
import type { LinksFunction } from "@remix-run/server-runtime";
import { Subheading } from "../Subheading/Subheading";
import { Text } from "../Text/Text";
import { Box } from "../Box/Box";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export interface AlertModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  message: string;

  trigger: React.ReactNode;
  body: React.ReactNode;
}

export const AlertModal = ({
  isOpen,
  onOpenChange,
  trigger,
  title,
  message,
  body,
}: AlertModalProps): JSX.Element => {
  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="alert-modal-overlay">
          <RadixDialog.Content className="alert-modal-content">
            <RadixDialog.Title asChild>
              <Subheading>{title}</Subheading>
            </RadixDialog.Title>
            <Box mb={3}>
              <RadixDialog.Description asChild>
                <Text>{message}</Text>
              </RadixDialog.Description>
            </Box>
            <Box>{body}</Box>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
