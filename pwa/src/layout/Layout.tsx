import * as React from "react";
import "../styling/index.css";
import * as styles from "./Layout.module.css";
import "./../translations/i18n";
import APIContext, { APIProvider } from "../apiService/apiContext";
import APIService from "../apiService/apiService";
import { GatsbyProvider, IGatsbyContext, TScreenSize } from "../context/gatsby";
import { HeaderTemplate } from "../templates/templateParts/header/HeaderTemplate";
import { FooterTemplate } from "../templates/templateParts/footer/FooterTemplate";
import { FiltersProvider, IFilters, baseFilters as _filters } from "../context/filters";
import { useTranslation } from "react-i18next";
import _ from "lodash";
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

export const TOOLTIP_ID = "cb8f47c3-7151-4a46-954d-784a531b01e6";

interface LayoutProps {
  children: React.ReactNode;
  pageContext: any; // Gatsby pageContext
  location: any; // Gatsby location
}

const Layout: React.FC<LayoutProps> = ({ children, pageContext, location }) => {
  const [filters, setFilters] = React.useState<IFilters>(_filters);
  const [API, setAPI] = React.useState<APIService | null>(React.useContext(APIContext));
  const [, setBreadcrumbs] = React.useState<any>(null);
  const [screenSize, setScreenSize] = React.useState<TScreenSize>("mobile");
  const [gatsbyContext, setGatsbyContext] = React.useState<IGatsbyContext>({
    ...{ pageContext, location, screenSize: "mobile" },
  });

  const { t } = useTranslation();

  library.add(fas, fab, far);

  React.useEffect(() => {
    setAPI(new APIService());
  }, []);

  React.useEffect(() => {
    setGatsbyContext({ ...{ pageContext, location, screenSize: getScreenSize(window.innerWidth) } });

    const JWT = sessionStorage.getItem("JWT");

    API && !API.authenticated && JWT && API.setAuthentication(JWT);
  }, [pageContext, location, screenSize]);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    window.addEventListener("resize", handleWindowResize);

    () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  React.useEffect(() => {
    if (!gatsbyContext) return;

    const {
      pageContext: {
        breadcrumb: { crumbs },
      },
    } = gatsbyContext;

    setBreadcrumbs(
      crumbs.map((crumb: any) => ({
        ...crumb,
        crumbLabel: t(_.upperFirst(crumb.crumbLabel)),
      })),
    );
  }, [gatsbyContext]);

  if (!API) return <></>;

  return (
    <>
      <Head />

      <GatsbyProvider value={gatsbyContext}>
        <APIProvider value={API}>
          <FiltersProvider value={[filters, setFilters]}>
            <Surface>
              <Document>
                <ToolTip id={TOOLTIP_ID} />

                <Favicon url={Logo} />

                <HeaderTemplate layoutClassName={styles.header} />

                <div className={styles.pageContent}>{children}</div>

                <FooterTemplate layoutClassName={styles.footer} />
              </Document>
            </Surface>
          </FiltersProvider>
        </APIProvider>
      </GatsbyProvider>
    </>
  );
};

export default Layout;
