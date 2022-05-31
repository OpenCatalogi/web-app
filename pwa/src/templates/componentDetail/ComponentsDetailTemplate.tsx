import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Heading1, Link } from "@gemeente-denhaag/components-react";
import { Container } from "../../components/container/Container";
import { Tags } from "../../components/tags/Tags";
import { navigate } from "gatsby";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";

interface ComponentsDetailTemplateProps {
  componentId: string;
  context: {
    name: string;
    types: string[];
    description: string;
  };
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = (componentId, context) => {
  return (
    <Container layoutClassName={styles.componentsDetailContainer}>
      <div className={styles.heading}>
        <div onClick={() => navigate("/components")}>
          <Link className={styles.link} icon={<ArrowLeftIcon />} iconAlign="start">
            Terug naar components
          </Link>
        </div>
        <Heading1 className={styles.title}>{componentId.context.name}</Heading1>
        <a className={styles.subtitle}>Dienst voor het kadaster en de openbare registers</a>
      </div>
      <Tags tags={componentId.context.types} />
      <p className={styles.description}>{componentId.context.description}</p>
    </Container>
  );
};
