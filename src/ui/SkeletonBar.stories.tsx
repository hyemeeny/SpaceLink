import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SkeletonBar from "./SkeletonBar";

const meta = {
  title: "UI/SkeletonBar",
  component: SkeletonBar,
} satisfies Meta<typeof SkeletonBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "h-4 w-48" },
};

export const Wide: Story = {
  args: { className: "h-8 w-full" },
};

export const Circle: Story = {
  args: { className: "h-12 w-12 rounded-full" },
};
