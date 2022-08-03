export const setEnv = () => {
  if (process.env.NODE_ENV === "development") {
    window.GATSBY_ME_URL = "https://opencatalogi.nl/me";
    window.GATSBY_API_URL = "https://opencatalogi.nl/api";
    window.GATSBY_ADMIN_URL = "https://opencatalogi.nl/admin";
    window.GATSBY_BASE_URL = "https://opencatalogi.nl";
    window.GATSBY_FRONTEND_URL = "https://opencatalogi.nl:8000";
    window.GATSBY_ORGANIZATION =
      "http://webresourcecatalogus.conduction.svc.cluster.local/organizations/b2d3176e-f1c6-4365-ab86-dd253c65fc43";
    window.GATSBY_LOGIN_REDIRECT = "vault";
  }

  if (process.env.NODE_ENV === "production") {
    window.GATSBY_ME_URL = "https://opencatalogi.nl/api/users/me";
    window.GATSBY_API_URL = "https://opencatalogi.nl/api";
    window.GATSBY_ADMIN_URL = "https://opencatalogi.nl/admin";
    window.GATSBY_BASE_URL = "https://opencatalogi.nl";
    window.GATSBY_FRONTEND_URL = "https://opencatalogi.nl";
    window.GATSBY_ORGANIZATION = "";
    window.GATSBY_LOGIN_REDIRECT = "vault";
  }
};
