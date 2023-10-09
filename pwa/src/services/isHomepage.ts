//This function checks whether you are at the homepage considering a prefix value to unsure that code depending on the homepage works accordingly
export const isHomepage = (pathname: string): boolean => {
  //Checks if the prefix is set. If the prefix is set than the homepage is not "/"" but "/prefix"
  if (process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true") {
    return pathname !== `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}/`;
  }
  if (process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "false") {
    return pathname !== "/";
  }

  return false;
};
