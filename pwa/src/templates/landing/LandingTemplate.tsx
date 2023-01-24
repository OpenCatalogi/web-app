import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import { Button, Divider, Heading3 } from "@gemeente-denhaag/components-react";
import { Container, DetailsCard, ImageAndDetailsCard } from "@conduction/components";
import { FeedbackTemplate } from "../templateParts/feedback/FeedbackTemplate";
import overOpenCatalogiImage from "./../../assets/svgs/SpotAPI.svg";
import aanDeSlagMetOpenCatalogiImage from "./../../assets/svgs/SpotForum.svg";
import { FiltersContext } from "../../context/filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faTags } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { LandingDisplayTemplate } from "../templateParts/landingDisplayTemplates/LandingDisplayTemplate";
import { GatsbyContext } from "../../context/gatsby";

export const LandingTemplate: React.FC = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = React.useContext(FiltersContext);
  const { screenSize } = React.useContext(GatsbyContext);

  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <div className={styles.landingDisplaySwitchButtons}>
          <Button
            className={styles.buttonIcon}
            variant={filters.landingDisplayLayout === "cards" ? "primary-action" : "secondary-action"}
            onClick={() => setFilters({ ...filters, landingDisplayLayout: "cards" })}
          >
            <FontAwesomeIcon icon={faTags} />
            {t("Cards")}
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
        <Heading3 className={styles.textColor}>Veelbezochte pagina's</Heading3>
        {screenSize === "desktop" && (
          <div className={styles.cards}>
            <ImageAndDetailsCard
              layoutClassName={styles.textColor}
              title="Over OpenCatalogi"
              image={<img src={overOpenCatalogiImage} />}
              introduction="OpenCatalogi is een weergave van Componenten verdeeld over de 5 lagen zoals gedefinieerd door VNG in het Gegevenslandschap."
              link={{ label: "Ga naar Over OpenCatalogi", href: "/documentation/about" }}
            />

            <ImageAndDetailsCard
              layoutClassName={styles.textColor}
              title="Aan de slag met OpenCatalogi"
              image={<img src={aanDeSlagMetOpenCatalogiImage} />}
              introduction="Wilt u uw component op OpenCatalogi aanbieden zodat andere uw component kunnen (her)gebruiken of bij dragen aan de doorontwikkeling van uw component?"
              link={{ label: "Aan de slag met OpenCatalogi", href: "documentation/usage" }}
            />
          </div>
        )}
        {screenSize === "tablet" && (
          <div className={styles.cards}>
            <DetailsCard
              layoutClassName={styles.textColor}
              title="Over OpenCatalogi"
              link={{ label: "Ga naar Over OpenCatalogi", href: "/documentation/about" }}
            />
            <DetailsCard
              layoutClassName={styles.textColor}
              title="Aan de slag met OpenCatalogi"
              link={{ label: "Aan de slag met OpenCatalogi", href: "documentation/usage" }}
            />
          </div>
        )}

        {screenSize === "mobile" && (
          <div className={styles.cards}>
            <DetailsCard
              layoutClassName={styles.textColor}
              title="Over OpenCatalogi"
              link={{ label: "Ga naar Over OpenCatalogi", href: "/documentation/about" }}
            />
            <DetailsCard
              layoutClassName={styles.textColor}
              title="Aan de slag met OpenCatalogi"
              link={{ label: "Aan de slag met OpenCatalogi", href: "documentation/usage" }}
            />
          </div>
        )}
      </section>

      <Divider />

      <FeedbackTemplate layoutClassName={styles.feedback} />
    </Container>
  );
};
