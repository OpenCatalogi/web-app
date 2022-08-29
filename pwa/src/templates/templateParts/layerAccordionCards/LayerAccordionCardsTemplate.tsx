import * as React from "react";
import * as styles from "./LayerAccordionCardsTemplate.module.css";
import { QuoteWrapper } from "@conduction/components";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import Collapsible from "react-collapsible";
import { ComponentCard } from "../../../components/componentCard/ComponentCard";
import { LayerAccordionCardsHeaderTemplate } from "./header/LayerAccordionCardsHeaderTemplate";

interface LayerAccordionCardsTemplateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  title: string;
  components: any[];
}

const LayerAccordionCardsTemplate: React.FC<LayerAccordionCardsTemplateProps> = ({
  open,
  setOpen,
  color,
  title,
  components,
}) => {
  const count = components.length;
  return (
    <div className={!open ? styles.container : ""}>
      <QuoteWrapper borderColor={count > 0 ? color : ""}>
        <Collapsible
          triggerDisabled={count <= 0}
          trigger={<LayerAccordionCardsHeaderTemplate {...{ open, title, count }} />}
          {...{ open }}
          transitionTime={200}
          onOpening={() => setOpen(true)}
          onClosing={() => setOpen(false)}
        >
          <div className={styles.ComponentsGrid}>
            {components.map((component) => (
              <ComponentCard
                key={component.id}
                title={{ label: component.name, href: `/components/${component.id}` }}
                description={component.embedded?.description?.shortDescription}
                layer={component.embedded?.nl.embedded?.commonground.layerType}
                category={{ label: "functie autorisatie", icon: <FontAwesomeIcon icon={faLock} /> }}
                tags={{
                  status: component.developmentStatus,
                  installations: component.usedBy?.length(),
                  organisation: component?.embedded?.legal?.embedded?.repoOwner.name,
                  licence: component?.embedded?.legal?.license,
                  githubLink: component?.embedded?.url?.url,
                }}
              />
            ))}
          </div>
        </Collapsible>
      </QuoteWrapper>
    </div>
  );
};

const LayerAccordionCardsController = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  return { open, setOpen };
};

const LayerAccordionCards = { accordion: LayerAccordionCardsTemplate, controller: LayerAccordionCardsController };
export { LayerAccordionCards };
