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
      label: t("Software"),
      handleClick: () => {
        setFilters({ ...filters, softwareType: "standalone/desktop" });
        navigate("/components");
      },
    },
    {
      label: t("Data models"),
      handleClick: () => {
        setFilters({ ...filters, softwareType: "schema" });
        navigate("/components");
      },
    },
    {
      label: t("API's"),
      handleClick: () => {
        setFilters({ ...filters, softwareType: "api" });
        navigate("/components");
      },
    },
    {
      label: t("About"),
      handleClick: () => {
        navigate("/about");
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
