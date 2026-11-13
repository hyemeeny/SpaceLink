import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import CtaButton from "./CtaButton";

const meta = {
  title: "Components/Button/CtaButton",
  component: CtaButton,
  args: {
    children: "추가하기",
    onClick: fn(),
  },
} satisfies Meta<typeof CtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gradient: Story = {
  args: { variant: "gradient", type: "button" },
};

export const Red: Story = {
  args: { variant: "red", children: "삭제하기" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsLink: Story = {
  args: { url: "/" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {(["small", "medium", "large"] as const).map((size) => (
        <CtaButton key={size} {...args} size={size}>
          {size}
        </CtaButton>
      ))}
    </div>
  ),
};
