import * as React from "react";
import * as styles from "./LayerAccordionTemplate.module.css";
import { QuoteWrapper } from "@conduction/components";
import Collapsible from "react-collapsible";
import { LayerAccordionHeaderTemplate } from "./header/LayerAccordionHeaderTemplate";

interface LayerAccordionTemplateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  title: string;
  badgeNumber?: number;
  children: React.ReactNode;
}

const LayerAccordionTemplate: React.FC<LayerAccordionTemplateProps> = ({
  open,
  setOpen,
  color,
  title,
  badgeNumber,
  children,
}) => {
  const borderColor = badgeNumber?.toString ? (badgeNumber > 0 ? color : "") : color;

  return (
    <div className={!open && styles.containerInactive}>
      <QuoteWrapper borderColor={borderColor}>
        <Collapsible
          triggerDisabled={badgeNumber ? badgeNumber <= 0 : false}
          trigger={<LayerAccordionHeaderTemplate {...{ open, title, badgeNumber }} />}
          {...{ open }}
          transitionTime={200}
          onOpening={() => setOpen(true)}
          onClosing={() => setOpen(false)}
        >
          {children}
        </Collapsible>
      </QuoteWrapper>
    </div>
  );
};

const LayerAccordionController = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  return { open, setOpen };
};

const LayerAccordion = { accordion: LayerAccordionTemplate, controller: LayerAccordionController };
export { LayerAccordion };
