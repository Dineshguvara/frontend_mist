const resolveImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/300";
  if (url.startsWith("http") || url.startsWith("https")) return url;
  if (url.startsWith("/")) return `http://192.168.29.225:3000${url}`;
  return url;
};

export default resolveImageUrl;
