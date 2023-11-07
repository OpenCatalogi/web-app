import * as React from "react";
import * as styles from "./FeedbackTemplate.module.css";
import clsx from "clsx";
import { ButtonLink } from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

interface FeedbackTemplateProps {
  layoutClassName?: string;
}

export const FeedbackTemplate: React.FC<FeedbackTemplateProps> = ({ layoutClassName }) => {
  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <span className={styles.heading}>Wensen of feedback?</span>

      <span className={styles.description}>
        Iedereen die geïnteresseerd is in dit product kan de roadmap bekijken of zelf ideën aandragen.
      </span>
      <div className={styles.buttons}>
        <ButtonLink
          target="_blank"
          href="https://github.com/OpenCatalogi/.github/issues/new?assignees=rubenvdlinde%2CRonaldvCortenberghe&labels=feature-request&template=feature.yml&title=%5Bfeature%5D%3A+Als+gebruiker+wil+ik+"
        >
          <FontAwesomeIcon icon={faExternalLink} />
          Wens of opmerking indienen op GitHub
        </ButtonLink>

        <ButtonLink target="_blank" href="https://github.com/orgs/OpenCatalogi/projects/1">
          <FontAwesomeIcon icon={faExternalLink} />
          Roadmap bekijken
        </ButtonLink>
      </div>
    </div>
  );
};
