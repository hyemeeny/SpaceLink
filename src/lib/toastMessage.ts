const toastMessages = {
  success: {
    login: "로그인에 성공하였습니다.",
    signUp: "회원가입에 성공하였습니다.",
    addLink: "링크가 추가되었습니다.",
    updateLink: "링크 URL이 변경되었습니다.",
    deleteLink: "링크가 삭제되었습니다.",
    favoriteLink: "즐겨찾기에 추가되었습니다.",
    unfavoriteLink: "즐겨찾기에 해제되었습니다.",
    addFolder: "폴더가 추가되었습니다.",
    updateFolder: "폴더 이름이 변경되었습니다.",
    deleteFolder: "폴더가 삭제되었습니다.",
  },
  error: {
    login: "로그인에 실패하였습니다.",
    signUp: "회원가입에 실패하였습니다.",
    addLink: "잘못된 링크 URL입니다.",
    addFolder: "잘못된 폴더 이름입니다.",
    favoriteLink: "즐겨찾기 중 오류가 발생했습니다.",
  },
};

export default toastMessages;
