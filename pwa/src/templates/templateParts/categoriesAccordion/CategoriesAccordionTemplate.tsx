import * as React from "react";
import * as styles from "./CategoriesAccordionTemplate.module.css";
import Collapsible from "react-collapsible";

interface CategoriesAccordionTemplateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  header: JSX.Element;
  children: React.ReactNode;
}

const CategoriesAccordionTemplate: React.FC<CategoriesAccordionTemplateProps> = ({
	open,
	setOpen,
	children,
	header,
}) => {
	return (
		<div className={!open ? styles.containerInactive : ""}>
			<Collapsible
				trigger={header}
				{...{ open }}
				transitionTime={200}
				onOpening={() => setOpen(true)}
				onClosing={() => setOpen(false)}
			>
				{children}
			</Collapsible>
		</div>
	);
};

const CategoriesAccordionController = () => {
	const [open, setOpen] = React.useState<boolean>(true);

	return { open, setOpen };
};

const CategoriesAccordion = { accordion: CategoriesAccordionTemplate, controller: CategoriesAccordionController };
export { CategoriesAccordion };
