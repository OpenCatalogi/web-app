import * as React from "react";

export type TMarkdownDirectory = {
  name: string;
  location: string;
};

export const useMarkdownDirectories = () => {
  const [directories, setDirectories] = React.useState<TMarkdownDirectory[]>([]);

  React.useEffect(() => {
    const markdownDirectoryPathsString: string | undefined =
      window.sessionStorage.getItem("GITHUB_DOCS_DIRECTORY_PATHS") ?? "";

    if (!markdownDirectoryPathsString) return;

    try {
      const directories = JSON.parse(markdownDirectoryPathsString);

      setDirectories(directories);
    } catch {
      console.warn("Something went wrong parsing the Markdown directories.");
    }
  }, []);

  const getSlugFromName = (name: string): string => name?.replace(" ", "-");
  const getNameFromSlug = (slug: string): string => slug?.replace("-", " "); // internal function

  const getDirectoryReadMeLocation = (pageSlug: string): string => {
    const directory = directories.find((directory) => directory.name === getNameFromSlug(pageSlug));

    if (!directory) return "";

    return `${directory.location}/README.md`;
  };

  const getDetailMdLocation = (pageSlug: string, detailPageSlug: string): string => {
    const directory = directories.find((directory) => directory.name === getNameFromSlug(pageSlug));

    if (!directory) return "";

    return `${directory.location}/${getNameFromSlug(detailPageSlug)}.md`;
  };

  return { directories, getSlugFromName, getDirectoryReadMeLocation, getDetailMdLocation };
};
