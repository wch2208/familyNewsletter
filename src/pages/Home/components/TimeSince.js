//게시물 작성 경과 시간 표시
export function TimeSince(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000; // 1년의 초

  if (interval > 1) {
    return Math.floor(interval) + "년 전";
  }
  interval = seconds / 2592000; // 1달의 초
  if (interval > 1) {
    return Math.floor(interval) + "달 전";
  }
  interval = seconds / 86400; // 1일의 초
  if (interval > 1) {
    return Math.floor(interval) + "일 전";
  }
  interval = seconds / 3600; // 1시간의 초
  if (interval > 1) {
    return Math.floor(interval) + "시간 전";
  }
  interval = seconds / 60; // 1분의 초
  if (interval > 1) {
    return Math.floor(interval) + "분 전";
  }
  return Math.floor(seconds) + "초 전";
}
