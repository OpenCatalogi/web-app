import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { GitHubLogo } from "../../../assets/svgs/GitHub";
import { Container, PrimaryTopNav, SecondaryTopNav } from "@conduction/components";
import { FiltersContext } from "../../../context/filters";

export const HeaderTemplate: React.FC = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useContext(FiltersContext);

  const primaryTopNavItems = [
    {
      label: "Home",
      handleClick: () => {
        navigate("/");
      },
    },
    {
      label: t("Interaction"),
      handleClick: () => {
        setFilters({ ...filters, layerType: ["interactie"] });
        navigate("/components");
      },
    },
    {
      label: t("Process"),
      handleClick: () => {
        setFilters({ ...filters, layerType: ["proces"] });
        navigate("/components");
      },
    },
    {
      label: t("Integration"),
      handleClick: () => {
        setFilters({ ...filters, layerType: ["integratie"] });
        navigate("/components");
      },
    },
    {
      label: t("Services"),
      handleClick: () => {
        setFilters({ ...filters, layerType: ["services"] });
        navigate("/components");
      },
    },
    {
      label: t("Data"),
      handleClick: () => {
        setFilters({ ...filters, layerType: ["data"] });
        navigate("/components");
      },
    },
  ];

  const secondaryTopNavItems = [
    {
      label: "Common ground",
      handleClick: () => {
        window.open("https://commonground.nl");
      },
    },
    {
      label: "Haven",
      handleClick: () => {
        window.open("https://haven.commonground.nl/");
      },
    },
    {
      label: "NL Design",
      handleClick: () => {
        window.open("https://designsystem.gebruikercentraal.nl/");
      },
    },
    {
      label: "Github",
      handleClick: () => {
        window.open("https://github.com/OpenCatalogi");
      },
      icon: <GitHubLogo />,
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <Container layoutClassName={styles.secondaryNavContainer}>
          <SecondaryTopNav items={secondaryTopNavItems} />
        </Container>
      </div>

      <Container layoutClassName={styles.headingContainer}>
        <Heading1 className={styles.title}>{t("Open Catalogs")}</Heading1>
        <span className={styles.subTitle}>{t("Reusable components within the government")}</span>
      </Container>

      <Container>
        <PrimaryTopNav items={primaryTopNavItems} />
      </Container>
    </header>
  );
};
