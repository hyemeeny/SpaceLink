import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SkeletonCard from "@/ui/SkeletonCard";

const meta = {
  title: "Components/Links/LinkCard",
  component: SkeletonCard,
} satisfies Meta<typeof SkeletonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  decorators: [
    (Story) => (
      <ul className="w-[413px]">
        <Story />
      </ul>
    ),
  ],
};
