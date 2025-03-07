import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";

const FolderShareModal = ({ selectedItem }: { selectedItem: { id: number; name: string } }) => {
  return (
    <ModalContainer modalId={`folderShare-${selectedItem.id}`}>
      <Header>폴더 공유</Header>
      <Content>
        <form className="flex flex-col gap-4 mt-3 w-[280px]">
          <p className="text-sm text-gray04 text-center mb-3 text-overflow2">{selectedItem.name}</p>
        </form>
      </Content>
    </ModalContainer>
  );
};

export default FolderShareModal;
