import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import { Heading3, Heading2 } from "@gemeente-denhaag/components-react";
import SpotAPI from "./../../assets/svgs/SpotAPI.svg";
import { useTranslation } from "react-i18next";
import { useComponent } from "../../hooks/components";
import { ImageAndDetailsCard, Container } from "@conduction/components";

export const LandingTemplate: React.FC = () => {
  const { t } = useTranslation();

  const _useComponent = useComponent();
  const getComponents = _useComponent.getAll(); // preload the components

  return (
    <Container>
      <div className={styles.heading}>
        <Heading2>{t("A central place for reuse of information technology within the government")}</Heading2>
        <span className={styles.subHeading}>Sed posuere consectetur est at lobortis.</span>
      </div>

      <Heading3 className={styles.subHeading}>
        {t("Here you will find components for all Common Ground layers")}
      </Heading3>

      <div className={styles.cardsContainer}>
        <ImageAndDetailsCard
          title={t("All Open Catalog components")}
          image={<img src={SpotAPI} />}
          introduction="Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor."
          link={{
            label: t("View all components"),
            href: "/components",
          }}
        />
      </div>
    </Container>
  );
};
