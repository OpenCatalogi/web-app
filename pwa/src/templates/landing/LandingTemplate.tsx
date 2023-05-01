import * as React from "react";
import * as styles from "./LandingTemplate.module.css";
import { Divider } from "@gemeente-denhaag/divider";
import { Container } from "@conduction/components/lib/components/container/Container";
import { DetailsCard, ImageAndDetailsCard } from "@conduction/components/lib/components/card/index";
import { FeedbackTemplate } from "../templateParts/feedback/FeedbackTemplate";
import overOpenCatalogiImage from "./../../assets/svgs/SpotAPI.svg";
import aanDeSlagMetOpenCatalogiImage from "./../../assets/svgs/SpotForum.svg";
import { FiltersContext } from "../../context/filters";
import { LandingDisplayTemplate } from "../templateParts/landingDisplayTemplates/LandingDisplayTemplate";
import { GatsbyContext } from "../../context/gatsby";
import ResultsDisplaySwitch from "../../components/resultsDisplaySwitch/ResultsDisplaySwitch";
import { Heading } from "@utrecht/component-library-react/dist/css-module";

export const LandingTemplate: React.FC = () => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { screenSize } = React.useContext(GatsbyContext);

  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <ResultsDisplaySwitch
          resultsDisplayType="landingDisplayLayout"
          layoutClassName={styles.landingDisplaySwitchButtons}
        />

        <LandingDisplayTemplate type={filters.landingDisplayLayout} />
      </section>

      <section className={styles.section}>
        <Heading level={3} className={styles.textColor}>
          Veelbezochte pagina's
        </Heading>
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
