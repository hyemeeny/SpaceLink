import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import Image from "next/image";

interface ShareButtonItem {
  title: string;
  image: string;
}

const shareButtons: ShareButtonItem[] = [
  {
    title: "카카오톡",
    image: "/icons/kakao.svg",
  },
  {
    title: "링크 복사",
    image: "/icons/copy.svg",
  },
];

const FolderShareModal = ({ selectedItem }: { selectedItem: { id: number; name: string } }) => {
  const handleShareToKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    });
  };

  return (
    <ModalContainer modalId={`folderShare-${selectedItem.id}`}>
      <Header>폴더 공유</Header>
      <Content>
        <p className="text-sm text-gray04 text-center mb-3 text-overflow2">{selectedItem.name}</p>
        <div className="flex items-center justify-center gap-8">
          {shareButtons.map((share) => (
            <button key={share.title} onClick={share.title === "카카오톡" ? handleShareToKakao : undefined}>
              <div className="relative size-14 mb-2">
                <Image src={share.image} fill alt={share.title} />
              </div>
              <p className="text-sm md:text-base text-gray06">{share.title}</p>
            </button>
          ))}
        </div>
      </Content>
    </ModalContainer>
  );
};

export default FolderShareModal;
