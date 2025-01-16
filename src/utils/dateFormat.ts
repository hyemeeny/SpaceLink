export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear(); // 연도
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
  const day = String(date.getDate()).padStart(2, "0"); // 일

  return `${year}. ${month}. ${day}`;
};

export const formatRelativeTime = (dateString: string): string => {
  const now = new Date(); // 현재 시간
  const inputTime = new Date(dateString); // 입력된 시간
  const diff = Math.floor((now.getTime() - inputTime.getTime()) / 1000); // 시간 차이 (초 단위)

  if (diff < 60) {
    return "방금 전"; // 1분 이내
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`; // 1시간 이내
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours}시간 전`; // 하루 이내
  } else {
    const days = Math.floor(diff / 86400);
    return `${days}일 전`; // 하루 이상
  }
};
