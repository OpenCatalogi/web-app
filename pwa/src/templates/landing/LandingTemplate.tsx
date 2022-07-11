import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import { SearchInputComponent } from "../templateParts/searchComponent/SearchInputComponent";
import { Heading2, Link } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { Container } from "@conduction/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

export const LandingTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container layoutClassName={styles.container}>
      <Heading2>{t("A central place for reuse of information technology within the government")}</Heading2>
      <span> {t("Here you will find components for all Common Ground layers")}</span>
      <SearchInputComponent />
      <Link icon={<ArrowRightIcon />} iconAlign="start" href="/components">
        {t("View all components")}
      </Link>
    </Container>
  );
};
