import * as React from "react";
import * as styles from "./CardsLandingDisplayTemplate.module.css";
import _ from "lodash";
import { InfoCard } from "@conduction/components";
import { Heading2, Paragraph } from "@utrecht/component-library-react/dist/css-module";

interface CardsLandingDisplayTemplateProps {}

export const CardsLandingDisplayTemplate: React.FC<CardsLandingDisplayTemplateProps> = ({}) => {
  return (
    <>
      <div className={styles.subHeading}>
        <Heading2>Portfolio</Heading2>
        <Paragraph lead>
          Voor onderstaande gemeentelijke producten en diensten zijn Common Ground oplossingen beschikbaar.
        </Paragraph>
      </div>
      <div className={styles.ComponentsGrid}>
        <InfoCard
          title="Financiële stabiliteit"
          content={
            <span>De gemeente helpt inwoners met geldzorgen om grip te krijgen op hun financiële situatie.</span>
          }
        />
        <InfoCard
          title="Melding openbare ruimte"
          content={<span>Inwoners kunnen digitaal meldingen doen bij de gemeente.</span>}
        />
        <InfoCard
          title="Registratie toeristische verhuur woonruimte"
          content={<span>Inwoners kunnen een registratienummer aanvragen om hun woning te kunnen verhuren.</span>}
        />
        <InfoCard
          title="Parkeerbeheer"
          content={<span>De gemeente helpt inwoners met het verkrijgen van parkeer vergunningen.</span>}
        />
        <InfoCard title="Mijn Zaken" content={<span>Inwonders kunnen digitaal hun zaken bekijken.</span>} />
        <InfoCard title="Inburgering" content={<span>De gemeente helpt nieuwe inwonders met het inburgeren.</span>} />
      </div>
    </>
  );
};
