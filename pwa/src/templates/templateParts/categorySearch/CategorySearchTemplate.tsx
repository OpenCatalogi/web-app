import * as React from "react";
import * as styles from "./CategorySearchTemplate.module.css";
import { Button, Divider, Heading3 } from "@gemeente-denhaag/components-react";
import Collapsible from "react-collapsible";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuoteWrapper } from "@conduction/components";
import clsx from "clsx";
import { categories } from "../../../data/categories";

export const CategorySearchTemplate: React.FC = () => {
  const [interactionOpen, setInteractionOpen] = React.useState<boolean>(true);
  const [processOpen, setProcessOpen] = React.useState<boolean>(true);
  const [integrationOpen, setIntegrationOpen] = React.useState<boolean>(true);
  const [servicesOpen, setServicesOpen] = React.useState<boolean>(true);
  const [dataOpen, setDataOpen] = React.useState<boolean>(true);

  return (
    <>
      <div className={styles.filters}>
        <span
          onClick={() => setInteractionOpen((o) => !o)}
          className={clsx(styles.interaction, interactionOpen && styles.open)}
        >
          Interactie
        </span>

        <span onClick={() => setProcessOpen((o) => !o)} className={clsx(styles.process, processOpen && styles.open)}>
          Proces
        </span>

        <span
          onClick={() => setIntegrationOpen((o) => !o)}
          className={clsx(styles.integration, integrationOpen && styles.open)}
        >
          Integratie
        </span>

        <span onClick={() => setServicesOpen((o) => !o)} className={clsx(styles.services, servicesOpen && styles.open)}>
          Services
        </span>

        <span onClick={() => setDataOpen((o) => !o)} className={clsx(styles.data, dataOpen && styles.open)}>
          Data
        </span>
      </div>

      <Layer
        title="Interactie"
        open={interactionOpen}
        setOpen={setInteractionOpen}
        color="#CFE2FF"
        categories={categories.interaction}
      />
      <Layer
        title="Proces"
        open={processOpen}
        setOpen={setProcessOpen}
        color="#F8D7DA"
        categories={categories.process}
      />
      <Layer
        title="Integratie"
        open={integrationOpen}
        setOpen={setIntegrationOpen}
        color="#FFF3CD"
        categories={categories.integration}
      />
      <Layer
        title="Services"
        open={servicesOpen}
        setOpen={setServicesOpen}
        color="#D1E7DD"
        categories={categories.services}
      />
      <Layer title="Data" open={dataOpen} setOpen={setDataOpen} color="#E2D9F3" categories={categories.data} />
    </>
  );
};

/**
 * Layer
 */
interface LayerProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  categories: any[];
}

const Layer: React.FC<LayerProps> = ({ title, open, setOpen, color, categories }) => {
  return (
    <QuoteWrapper borderColor={color}>
      <Collapsible
        trigger={<LayerHeader {...{ open, title }} />}
        {...{ open }}
        transitionTime={200}
        onOpening={() => setOpen(true)}
        onClosing={() => setOpen(false)}
      >
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <Button variant="secondary-action" icon={category.icon}>
              {category.title}
            </Button>
          ))}
        </div>
      </Collapsible>
    </QuoteWrapper>
  );
};

/**
 * Header
 */
interface LayerHeaderProps {
  title: string;
  open: boolean;
}

const LayerHeader: React.FC<LayerHeaderProps> = ({ open, title }) => {
  return (
    <div className={clsx(styles.layerHeaderContainer, open && styles.open)}>
      <div className={styles.layerHeaderContent}>
        <Heading3>{title}</Heading3>

        <FontAwesomeIcon className={clsx(styles.layerHeaderToggleIcon, open && styles.open)} icon={faChevronDown} />
      </div>

      <Divider />
    </div>
  );
};
