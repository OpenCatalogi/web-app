import * as React from "react";
import * as styles from "./FeedbackTemplate.module.css";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { Button } from "@gemeente-denhaag/components-react";
import clsx from "clsx";

interface FeedbackTemplateProps {
  layoutClassName?: string;
}

export const FeedbackTemplate: React.FC<FeedbackTemplateProps> = ({ layoutClassName }) => {
  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <span className={styles.heading}>Wensen of feedback?</span>

      <span className={styles.content}>
        Deze website is 'permanente beta' en zal worden aangepast naar de behoeften van gebruikers. Wensen en
        opmerkingen kunnen via een melding op GitHub doorgegeven worden.
      </span>

      <Button
        className={styles.button}
        variant="secondary-action"
        onClick={() => open("https://github.com/OpenCatalogi/.github/issues/new/choose")}
        icon={<ExternalLinkIcon />}
      >
        Melding maken op GitHub
      </Button>
    </div>
  );
};
