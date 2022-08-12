import { QuoteWrapper } from "@conduction/components";
import { Button } from "@gemeente-denhaag/components-react";
import * as React from "react";
import Collapsible from "react-collapsible";
import { LayerAccordionHeaderTemplate } from "./header/LayerAccordionHeaderTemplate";
import * as styles from "./LayerAccordionTemplate.module.css";

interface LayerAccordionTemplateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  title: string;
  categories: any[];
}

const LayerAccordionTemplate: React.FC<LayerAccordionTemplateProps> = ({ open, setOpen, color, title, categories }) => {
  return (
    <QuoteWrapper borderColor={color}>
      <Collapsible
        trigger={<LayerAccordionHeaderTemplate {...{ open, title }} />}
        {...{ open }}
        transitionTime={200}
        onOpening={() => setOpen(true)}
        onClosing={() => setOpen(false)}
      >
        <div className={styles.items}>
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

const LayerAccordionController = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  return { open, setOpen };
};

const LayerAccordion = { accordion: LayerAccordionTemplate, controller: LayerAccordionController };
export { LayerAccordion };
