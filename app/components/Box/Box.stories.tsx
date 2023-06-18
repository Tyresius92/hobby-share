import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Simple: Story = {
  args: {
    children: "Use the controls to modify spacing",
  },
};

export const Complex: Story = {
  render: (args) => {
    return (
      <Box {...args}>
        <Box p={4} mx={3} mt={5} mb={7}>
          <Box>Hello</Box>
          Inner box
        </Box>
      </Box>
    );
  },
};
