import { useTranslation } from "react-i18next";
export const addNewLineToString = (string: string) => {
  const { t } = useTranslation();
  if (!string) return t("Unkown");
  if (string) return string.match(/.{1,25}(\s|$)/g)?.join("\n");
};
