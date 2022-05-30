import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { Container } from "../../../components/container/Container";
import { ITopNavItem, PrimaryTopNav, SecondaryTopNav } from "../../../components/topNav/TopNav";
import { useTranslation } from "react-i18next";
import { GitHubLogo } from "../../../assets/svgs/GitHub";

export const HeaderTemplate: React.FC = () => {
  const { t } = useTranslation();

  const primaryTopNavItems: ITopNavItem[] = [
    { label: "Home", href: "/" },
    { label: t("Interaction"), href: "/components", linkState: { type: "interactie" } },
    { label: t("Process"), href: "/components", linkState: { type: "proces" } },
    { label: t("Integration"), href: "/components", linkState: { type: "integratie" } },
    { label: t("Services"), href: "/components", linkState: { type: "services" } },
    { label: t("Data"), href: "/components", linkState: { type: "data" } },
  ];

  const secondaryTopNavItems: ITopNavItem[] = [
    { label: "Common ground", href: "https://commonground.nl" },
    { label: "Haven", href: "https://haven.commonground.nl/" },
    { label: "NL Design", href: "https://designsystem.gebruikercentraal.nl/" },
    {
      label: "Github",
      href: "https://github.com/OpenCatalogi",
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
