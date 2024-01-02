import * as React from "react";

export type TGitHubDirectory = {
  name: string;
  location: string;
};

export const useGitHubDirectories = () => {
  const [directories, setDirectories] = React.useState<TGitHubDirectory[]>([]);

  React.useEffect(() => {
    const gitHubDirectoryPathsString: string | undefined =
      window.sessionStorage.getItem("GITHUB_DOCS_DIRECTORY_PATHS") ?? "";

    if (!gitHubDirectoryPathsString) return;

    try {
      const directories = JSON.parse(gitHubDirectoryPathsString);

      setDirectories(directories);
    } catch {
      console.warn("Something went wrong parsing the GitHub directories.");
    }
  }, []);

  const getSlugFromName = (name: string): string => name.replace(" ", "-");
  const getNameFromSlug = (slug: string): string => slug.replace("-", " "); // internal function

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
