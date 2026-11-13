import { ComponentProps, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import Pagination from "./Pagination";

const meta = {
  title: "Components/Button/Pagination",
  component: Pagination,
  args: {
    totalCount: 50,
    currentPage: 1,
    pageSize: 10,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// 정적 상태 확인용
export const FirstPage: Story = {};

export const LastPage: Story = {
  args: { currentPage: 5 },
};

const InteractivePagination = (args: ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.currentPage);
  return (
    <Pagination
      {...args}
      currentPage={page}
      onPageChange={(p) => {
        setPage(p);
        args.onPageChange(p);
      }}
    />
  );
};

// 실제로 이동되는 모습 확인용
export const Interactive: Story = {
  render: (args) => <InteractivePagination {...args} />,
  // 실제 브라우저에서 페이지 이동이 일어나는지 확인하는 테스트
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "3 페이지" }));
    await expect(canvas.getByRole("button", { name: "3 페이지" })).toHaveAttribute("aria-current", "page");
  },
};
