import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { Container } from "../../../components/container/Container";
import { PrimaryTopNav, SecondaryTopNav } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { GitHubLogo } from "../../../assets/svgs/GitHub";

export const HeaderTemplate: React.FC = () => {
  const { t } = useTranslation();

  const primaryTopNavItems = [
    { label: "Home", handleClick: () => {
        navigate("/");
      } },
    { label: t("Interaction"), handleClick: () => {
        navigate("/components");
      } },
    { label: t("Process"), handleClick: () => {
        navigate("/components");
      } },
    { label: t("Integration"), handleClick: () => {
        navigate("/components");
      } },
    { label: t("Services"), handleClick: () => {
        navigate("/components");
      } },
    { label: t("Data"), handleClick: () => {
        navigate("/components");
      } },
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
        window.open("https://commonground.nl");
      },
    },
    {
      label: "NL Design",
      handleClick: () => {
        window.open("https://commonground.nl");
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
