function formatTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);

  // 关键修正：拼接为 YYYY-MM-DD HH:mm:ss 格式（MySQL datetime 要求）
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  return formattedTime;
};

// 保持命名导出不变
module.exports = { formatTime };