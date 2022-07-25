import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import { SearchComponentTemplate } from "../templateParts/searchComponent/SearchComponentTemplate";
import { Divider, Heading2 } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { Container } from "@conduction/components";
import { FeedbackTemplate } from "../templateParts/feedback/FeedbackTemplate";
import { MiniDashboardTemplate } from "../templateParts/miniDashboard/MiniDashboardTemplate";

export const LandingTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.headingAndSearchForm}>
        <div className={styles.heading}>
          <Heading2>{t("A central place for reuse of information technology within the government")}</Heading2>
          <span> {t("Here you will find components for all Common Ground layers")}</span>
        </div>

        <SearchComponentTemplate layoutClassName={styles.searchFormContainer} />
      </section>

      <Divider />

      <section className={styles.miniDashboardContainer}>
        <Heading2>Open Catalogi in getallen</Heading2>

        <MiniDashboardTemplate />
      </section>

      <Divider />

      <FeedbackTemplate layoutClassName={styles.feedback} />
    </Container>
  );
};
