import * as React from "react";
import * as styles from "./Layout.module.css";

import "../styling/index.css";
import "./../translations/i18n";

import { GlobalProvider, IGlobalContext, defaultGlobalContext } from "../context/global";
import APIContext, { APIProvider } from "../apiService/apiContext";
import APIService from "../apiService/apiService";
import { TScreenSize } from "../context/gatsby";
import { HeaderTemplate } from "../templates/templateParts/header/HeaderTemplate";
import { FooterTemplate } from "../templates/templateParts/footer/FooterTemplate";
import { Head } from "./Head";
import { getScreenSize } from "../services/getScreenSize";
import Favicon from "react-favicon";
import Logo from "../assets/images/logo_OpenCatalogi.png";
import { ToolTip } from "@conduction/components";
import { Document } from "@utrecht/component-library-react/dist/css-module";
import { Surface } from "@utrecht/component-library-react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useEnvironment } from "../hooks/useEnvironment";
import { ThemeSwitcherTopBar } from "../templates/templateParts/themeSwitcherTopBar/ThemeSwitcherTopBar";

export const TOOLTIP_ID = "cb8f47c3-7151-4a46-954d-784a531b01e6";

interface LayoutProps {
  children: React.ReactNode;
  pageContext: any; // Gatsby pageContext
  location: any; // Gatsby location
}

const Layout: React.FC<LayoutProps> = ({ children, pageContext, location }) => {
  const [globalContext, setGlobalContext] = React.useState<IGlobalContext>(defaultGlobalContext);
  const [API, setAPI] = React.useState<APIService | null>(React.useContext(APIContext));
  const [screenSize, setScreenSize] = React.useState<TScreenSize>("mobile");
  const { initiateFromEnv, initiateFromJSON } = useEnvironment();

  library.add(fas, fab, far);

  React.useEffect(() => {
    if (process.env.GATSBY_ENV_VARS_SET === "true") {
      initiateFromEnv();
    } else {
      initiateFromJSON(window.location.hostname);
    }
  }, []);

  React.useEffect(() => {
    // initiate API Service
    setAPI(new APIService());

    // initiate screen size watcher
    const handleWindowResize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    window.addEventListener("resize", handleWindowResize);

    () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  React.useEffect(() => {
    // keep track of authentication
    const JWT = sessionStorage.getItem("JWT");

    API && !API.authenticated && JWT && API.setAuthentication(JWT);

    // keep track of gatsby context
    setGlobalContext((context) => ({
      ...context,
      initiated: true,
      gatsby: {
        ...{ pageContext, location, screenSize: getScreenSize(window.innerWidth) },
      },
    }));
  }, [pageContext, location, screenSize]);

  if (!globalContext.initiated) return <></>;

  return (
    <>
      <Head />

      <GlobalProvider value={[globalContext, setGlobalContext]}>
        <APIProvider value={API}>
          <Surface>
            <Document>
              <ToolTip id={TOOLTIP_ID} />

              <Favicon url={process.env.GATSBY_FAVICON_URL ?? Logo} />

              <ThemeSwitcherTopBar />

              <HeaderTemplate layoutClassName={styles.header} />

              <div className={styles.pageContent}>{children}</div>

              <FooterTemplate layoutClassName={styles.footer} />
            </Document>
          </Surface>
        </APIProvider>
      </GlobalProvider>
    </>
  );
};

export default Layout;
