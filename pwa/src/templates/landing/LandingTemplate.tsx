import * as React from "react";
import { Container } from "../../components/container/Container";
import * as styles from "./LandingTemplate.module.css";
import { Heading3, Heading2, Paragraph } from "@gemeente-denhaag/components-react";
import { ImageAndDetailsCard, RichContentCard } from "../../components/card";
import SpotAPI from "./../../assets/svgs/SpotAPI.svg";
import SpotForum from "./../../assets/svgs/SpotForum.svg";

export const LandingTemplate: React.FC = () => {
  return (
    <Container>
      <div className={styles.text}>
        <Heading2>Eén centrale plek voor de developer die voor of met de overheid ontwikkelt</Heading2>
        <Paragraph>
          Ben je een developer die iets voor of met de overheid ontwikkelt? Dan vind je hier handige bronnen en de
          community voor de ontwikkeling van jouw digitale services.
        </Paragraph>
      </div>

      <Heading3 className={styles.title}>(direct naar) veelbezochte pagina's</Heading3>

      <div className={styles.cards}>

          <ImageAndDetailsCard
            iconAlign
            title={"API’s binnen de Nederlandse overheid"}
            image={<img src={SpotAPI} />}
            introduction={"Een wegwijzer naar de API’s die (semi-)overheidsorganisaties in Nederland aanbieden."}
            link={{
              label: "Bekijk API’s",
              href: "#",
            }}
            layoutClassName={styles.API}
          />

          <ImageAndDetailsCard
            iconAlign
            title={"Forum voor developers"}
            image={<img src={SpotForum} />}
            introduction={"EDe centrale plek om in gesprek te gaan over digitale overheidsdiensten."}
            link={{
              label: "Ga naar form",
              href: "#",
            }}
            layoutClassName={styles.forum}
          />

      </div>
    </Container>
  );
};
