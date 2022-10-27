import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import { Button, Divider, Heading3 } from "@gemeente-denhaag/components-react";
import { Container, ImageAndDetailsCard } from "@conduction/components";
import { FeedbackTemplate } from "../templateParts/feedback/FeedbackTemplate";
import overOpenCatalogiImage from "./../../assets/svgs/SpotAPI.svg";
import aanDeSlagMetOpenCatalogiImage from "./../../assets/svgs/SpotForum.svg";
import { FiltersContext } from "../../context/filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faTags } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { LandingDisplayTemplate } from "../templateParts/landingDisplayTemplates/LandingDisplayTemplate";

export const LandingTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <div className={styles.landingDisplaySwitchButtons}>
          <Button
            className={styles.buttonIcon}
            variant={filters.landingDisplayLayout === "categories" ? "primary-action" : "secondary-action"}
            onClick={() => setFilters({ ...filters, landingDisplayLayout: "categories" })}
          >
            <FontAwesomeIcon icon={faTags} />
            {t("Categories")}
          </Button>
          <Button
            className={styles.buttonIcon}
            variant={filters.landingDisplayLayout === "layer" ? "primary-action" : "secondary-action"}
            onClick={() => setFilters({ ...filters, landingDisplayLayout: "layer" })}
          >
            <FontAwesomeIcon icon={faLayerGroup} />
            {t("Layers")}
          </Button>
        </div>

        <LandingDisplayTemplate type={filters.landingDisplayLayout} />
      </section>

      <section className={styles.section}>
        <Heading3>(Direct naar) veelbezochte pagina's</Heading3>

        <div className={styles.cards}>
          <ImageAndDetailsCard
            layoutClassName={styles.textColor}
            title="Over Open Catalogi"
            image={<img src={overOpenCatalogiImage} />}
            introduction="Open Catalogi is een weergave van Componenten verdeeld over de 5 lagen zoals gedefinieerd door VNG in het Gegevenslandschap."
            link={{ label: "Ga naar Over Open Catalogi", href: "/about" }}
          />

          <ImageAndDetailsCard
            layoutClassName={styles.textColor}
            title="Aan de slag met Open Catalogi"
            image={<img src={aanDeSlagMetOpenCatalogiImage} />}
            introduction="Wilt u uw component op Open Catalogi aanbieden zodat andere uw component kunnen (her)gebruiken of bij dragen aan de doorontwikkeling van uw component?"
            link={{ label: "Aan de slag met Open Catalogi", href: "documentation/usage" }}
          />
        </div>
      </section>

      <Divider />

      <FeedbackTemplate layoutClassName={styles.feedback} />
    </Container>
  );
};
