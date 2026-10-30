import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import clsx from "clsx";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useModalStore } from "@/store/useModalStore";
import Modal from "./Modal";
import BaseInput from "../Input/BaseInput";

const MODAL_ID = "story-modal";

const MOCK_FOLDERS = [
  { id: 1, name: "나만의 장소", linkCount: 12 },
  { id: 2, name: "유용한 글", linkCount: 5 },
  { id: 3, name: "블로그", linkCount: 10 },
  { id: 4, name: "개발 자료", linkCount: 3 },
  { id: 5, name: "React 자료", linkCount: 7 },
  { id: 6, name: "JavaScript 자료", linkCount: 15 },
];

const FolderSelectList = () => {
  const [folderId, setFolderId] = useState(1);

  return (
    <ul className="flex flex-col gap-2">
      {MOCK_FOLDERS.map((folder) => (
        <li
          key={folder.id}
          className={clsx(
            "text-sm rounded-lg px-3 py-2",
            folder.id === folderId ? "bg-gray01 text-purple01" : "text-gray06",
          )}
        >
          <button type="button" onClick={() => setFolderId(folder.id)} className="flex items-center gap-4 w-full">
            {folder.name}
            <span className="text-sm text-gray04">{folder.linkCount}개 링크</span>
            {folder.id === folderId && <IoCheckmarkCircle className="ml-auto text-xl text-purple01" />}
          </button>
        </li>
      ))}
    </ul>
  );
};

const ControlledInput = ({ initial = "" }: { initial?: string }) => {
  const [value, setValue] = useState(initial);
  return (
    <BaseInput
      type="text"
      id="value"
      value={value}
      placeholder="폴더 이름 입력"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const meta = {
  title: "Components/Modal",
  component: Modal,
  args: {
    modalId: MODAL_ID,
    children: <ControlledInput />,
    onSubmit: fn(),
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        useModalStore.setState({ activeModal: MODAL_ID });
        return () => useModalStore.setState({ activeModal: null });
      }, []);
      return <Story />;
    },
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddLink: Story = {
  args: {
    title: "나만의 장소에 추가",
    action: "add",
    children: <FolderSelectList />,
  },
};
export const AddFolder: Story = { args: { title: "폴더 추가", action: "add" } };
export const Update: Story = {
  args: {
    title: "폴더 이름 변경",
    action: "update",
    children: <ControlledInput initial="나만의 장소" />,
  },
};
export const Delete: Story = {
  args: {
    title: "폴더 삭제",
    action: "delete",
    children: <p className="text-sm text-gray04 text-center mb-3 text-overflow2">나만의 장소</p>,
  },
};
export const Pending: Story = { args: { title: "폴더 추가", action: "add", isPending: true } };
export const Disabled: Story = { args: { title: "폴더 추가", action: "add", isValid: false } };
