import * as React from "react";
import * as styles from "./HeaderTemplate.module.css";
import { Heading1 } from "@gemeente-denhaag/components-react";
import { Container } from "../../../components/container/Container";
import { ITopNavItem, PrimaryTopNav, SecondaryTopNav } from "../../../components/topNav/TopNav";
import { useTranslation } from "react-i18next";
import { GitHubLogo } from "../../../assets/svgs/GitHub";

export const HeaderTemplate: React.FC = () => {
  const { t } = useTranslation();

  const PrimaryTopNavItems: ITopNavItem[] = [
    { label: "Home", href: "/" },
    { label: "Software", href: "/software" },
    { label: "Data", href: "/data" },
    { label: `${t("Processes")}`, href: "/processes" },
    { label: "API's", href: "/apis" },
    { label: `${t("Information Models")}`, href: "/information-models" },
  ];

  const SecondaryTopNavItems: ITopNavItem[] = [
    { label: "Commonground", href: "/commonground" },
    { label: "Haven", href: "/haven" },
    { label: "NL Design", href: "/nldesign" },
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
          <SecondaryTopNav items={SecondaryTopNavItems} />
        </Container>
      </div>

      <Container layoutClassName={styles.headingContainer}>
        <Heading1 className={styles.title}>{t("Open Catalogs")}</Heading1>
        <span className={styles.subTitle}>{t("Reusable components within the government")}</span>
      </Container>

      <Container>
        <PrimaryTopNav items={PrimaryTopNavItems} />
      </Container>
    </header>
  );
};
