import Image from "next/image";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { useModalStore } from "@/store/useModalStore";
import Modal from "@/components/Modal/Modal";

interface ShareButtonItem {
  title: string;
  image: string;
}

const shareButtons: ShareButtonItem[] = [
  { title: "카카오톡 공유", image: "/icons/kakao.svg" },
  { title: "클립보드 복사", image: "/icons/copy.svg" },
];

const FolderShareModal = ({ selectedItem }: { selectedItem: { id: number; name: string } }) => {
  const { closeModal } = useModalStore();
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/links?folderId=${selectedItem.id}`;

  const handleShareToKakao = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "나만의 링크 공간, SpaceLink 🚀",
        description: "좋아하는 링크들을 한 곳에 모아 공유해보세요.",
        imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.jpg`,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "링크 보러가기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });

    closeModal(`folderShare-${selectedItem.id}`);
  };

  const handleShareToCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success(toastMessages.success.ShareCopy);
    } catch (error) {
      toast.error(toastMessages.error.ShareCopy);
      console.error("클립보드 복사 실패:", error);
    }
    closeModal(`folderShare-${selectedItem.id}`);
  };

  return (
    <Modal modalId={`folderShare-${selectedItem.id}`} title="폴더 공유">
      <p className="text-sm text-gray04 text-center mb-3 text-overflow2">{selectedItem.name}</p>
      <div className="flex items-center justify-center gap-8">
        {shareButtons.map((share) => (
          <button
            key={share.title}
            type="button"
            onClick={share.title === "카카오톡 공유" ? handleShareToKakao : handleShareToCopy}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative size-14">
              <Image
                src={share.image}
                fill
                alt={share.title}
                sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 56px"
              />
            </div>
            <p className="text-sm text-gray06">{share.title}</p>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default FolderShareModal;
