import * as React from "react";
import * as styles from "./LayersResultTemplate.module.css";
import { QuoteWrapper } from "@conduction/components";
import clsx from "clsx";
import { navigate } from "gatsby";
import _ from "lodash";

interface LayersResultTemplateProps {
  components: any[];
}

export const LayersResultTemplate: React.FC<LayersResultTemplateProps> = ({ components }) => {
  const [interactieComponents, setInteractieComponents] = React.useState<any[]>([]);
  const [procesComponents, setProcesComponents] = React.useState<any[]>([]);
  const [integratieComponents, setIntegratieComponents] = React.useState<any[]>([]);
  const [servicesComponents, setServicesComponents] = React.useState<any[]>([]);
  const [dataComponents, setDataComponents] = React.useState<any[]>([]);

  React.useEffect(() => {
    setInteractieComponents(components);
    setProcesComponents(components);
    setIntegratieComponents(components);
    setServicesComponents(components);
    setDataComponents(components);
  }, [components]);

  return (
    <>
      {interactieComponents.length > 0 && <Layer title="Interactie" components={interactieComponents} />}
      {procesComponents.length > 0 && <Layer title="Proces" components={procesComponents} />}
      {integratieComponents.length > 0 && <Layer title="Integratie" components={integratieComponents} />}
      {servicesComponents.length > 0 && <Layer title="Services" components={servicesComponents} />}
      {dataComponents.length > 0 && <Layer title="Data" components={dataComponents} />}
    </>
  );
};

interface LayerProps {
  title: string;
  components: any[];
}

const Layer: React.FC<LayerProps> = ({ title, components }) => {
  return (
    <div className={styles.ComponentsGrid}>
      <QuoteWrapper borderWidth="20px">
        <span className={styles.title}>{title}</span>

        <div className={styles.container}>
          {components.map((component) => (
            <div
              key={component.id}
              onClick={() => navigate(`/components/${component.id}`)}
              className={clsx(styles.component, styles[_.camelCase(component.developmentStatus)])}
            >
              {component.name}
            </div>
          ))}
        </div>
      </QuoteWrapper>
    </div>
  );
};
