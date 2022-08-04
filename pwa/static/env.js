export const setEnv = () => {
  if (process.env.NODE_ENV === "development") {
    window.GATSBY_ME_URL = "https://opencatalogi.nl/api/users/me";
    window.GATSBY_API_URL = "https://opencatalogi.nl/api/oc";
    window.GATSBY_ADMIN_URL = "https://opencatalogi.nl/admin";
    window.GATSBY_BASE_URL = "https://opencatalogi.nl";
    window.GATSBY_FRONTEND_URL = "https://opencatalogi.nl";
    window.GATSBY_ORGANIZATION = "";
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
