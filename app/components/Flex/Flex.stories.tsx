import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "./Flex";

const meta: Meta<typeof Flex> = {
  title: "Components/Flex",
  component: Flex,
  argTypes: {
    justifyContent: {
      options: [
        "space-between",
        "space-around",
        "space-evenly",
        "flex-start",
        "flex-end",
        "center",
      ],
      control: "select",
    },
    alignItems: {
      options: ["flex-start", "flex-end", "center", "baseline"],
      control: "select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Simple: Story = {
  args: {
    children: (
      <>
        <span>Hello</span>
        <span>world</span>
      </>
    ),
    gap: 10,
  },
};

export const Complex: Story = {
  args: {
    ...Simple.args,
    gap: undefined,
    justifyContent: "space-between",
  },
};
