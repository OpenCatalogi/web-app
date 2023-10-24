export const getFileNameFromUrl = (url: string) => {
  const finalSlashIndex = url.lastIndexOf("/");
  return url.substring(finalSlashIndex + 1);
};

export const removeFileNameFromUrl = (url: string) => {
  const finalSlashIndex = url.lastIndexOf("/");
  return url.replace(`/${url.substring(finalSlashIndex + 1)}`, "");
};
