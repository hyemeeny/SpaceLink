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
  {
    title: "카카오톡 공유",
    image: "/icons/kakao.svg",
  },
  {
    title: "클립보드 복사",
    image: "/icons/copy.svg",
  },
];

const FolderShareModal = ({ selectedItem }: { selectedItem: { id: number; name: string } }) => {
  const { closeModal } = useModalStore();

  const handleShareToKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    });
    closeModal(`folderShare-${selectedItem.id}`);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(toastMessages.success.ShareCopy);
    } catch (error) {
      toast.error(toastMessages.error.ShareCopy);
      console.error("클립보드 복사 실패:", error);
    }
  };

  const handleShareToCopy = () => {
    const textToCopy = `${process.env.NEXT_PUBLIC_BASE_URL}/links?folderId=${selectedItem.id}`;
    copyToClipboard(textToCopy);
    closeModal(`folderShare-${selectedItem.id}`);
  };

  return (
    <Modal modalId={`folderShare-${selectedItem.id}`} title="폴더 공유">
      <p className="text-sm text-gray04 text-center mb-3 text-overflow2">{selectedItem.name}</p>
      <div className="flex items-center justify-center gap-8">
        {shareButtons.map((share) => (
          <button
            key={share.title}
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
        {/* <button onClick={handleShareToCopy} className="flex flex-col items-center gap-3">
          <div className="relative size-14">
            <Image
              src={"/icons/copy.svg"}
              fill
              alt="클립보드 복사"
              sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 56px"
            />
          </div>
          <p className="text-sm text-gray06">클립보드 복사</p>
        </button> */}
      </div>
    </Modal>
  );
};

export default FolderShareModal;
