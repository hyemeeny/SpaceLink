import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SkeletonCard from "@/ui/SkeletonCard";

const meta = {
  title: "Components/Links/LinkList",
  component: SkeletonCard,
} satisfies Meta<typeof SkeletonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  render: () => (
    <ul className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </ul>
  ),
};
