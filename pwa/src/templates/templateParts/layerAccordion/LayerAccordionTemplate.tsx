import * as React from "react";
import * as styles from "./LayerAccordionTemplate.module.css";
import { QuoteWrapper } from "@conduction/components";
import Collapsible from "react-collapsible";

interface LayerAccordionTemplateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  disabled?: boolean;
  header: JSX.Element;
  children: React.ReactNode;
}

const LayerAccordionTemplate: React.FC<LayerAccordionTemplateProps> = ({
  open,
  setOpen,
  color,
  children,
  header,
  disabled,
}) => {
  return (
    <div className={!open && styles.containerInactive}>
      <QuoteWrapper borderColor={!disabled ? color : ""}>
        <Collapsible
          triggerDisabled={disabled}
          trigger={header}
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
