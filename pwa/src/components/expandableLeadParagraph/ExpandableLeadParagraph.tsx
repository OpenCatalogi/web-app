import * as React from "react";
import * as styles from "./ExpandableLeadParagraph.module.css";
import { Button, Paragraph } from "@utrecht/component-library-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const SHORT_DESCRIPTION_TRESHOLD = 300;

interface ExpandableLeadParagraphProps {
  description: string;
}

export const ExpandableLeadParagraph: React.FC<ExpandableLeadParagraphProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [shortDescription, setShortDescription] = React.useState<string>("");
  const [descriptionIsExpandable, setDescriptionIsExpandable] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDescriptionIsExpandable(description.length > SHORT_DESCRIPTION_TRESHOLD);
  }, [description]);

  React.useEffect(() => {
    if (!descriptionIsExpandable) return;

    setShortDescription(`${description.substring(0, SHORT_DESCRIPTION_TRESHOLD)}...`);
  }, [descriptionIsExpandable]);

  if (!descriptionIsExpandable) return <Paragraph lead>{description}</Paragraph>; // Show desciption as-is without any changes

  return (
    <div className={styles.container}>
      <Paragraph lead>{isExpanded ? description : shortDescription}</Paragraph>

      <Button
        appearance="secondary-action-button"
        className={clsx(styles.toggleButton, isExpanded && styles.isExpanded)}
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        {isExpanded ? "Omschrijving inklappen" : "Volledige omschrijving lezen"}

        <FontAwesomeIcon icon={faChevronDown} />
      </Button>
    </div>
  );
};
