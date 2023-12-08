//This function checks whether you are at the homepage considering a prefix value to unsure that code depending on the homepage works accordingly
//The prefix is set in the config.js file
export const isHomepage = (pathname: string): boolean => {
  //Checks if the prefix is set. If the prefix is set than the homepage is not "/"" but "/prefix"
  if (window.sessionStorage.getItem("USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX") === "true") {
    return pathname === `/${window.sessionStorage.getItem("GITHUB_REPOSITORY_NAME")}/`;
  }
  if (window.sessionStorage.getItem("USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX") === "false") {
    return pathname === "/";
  }

  return false;
};
