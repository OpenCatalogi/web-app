import * as React from "react";
import * as styles from "./SubmitComponentTemplate.module.css";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { Button, Icon } from "@utrecht/component-library-react/dist/css-module";
import clsx from "clsx";
import { navigate } from "gatsby";

interface SubmitComponentTemplateProps {
  layoutClassName?: string;
}

export const SubmitComponentTemplate: React.FC<SubmitComponentTemplateProps> = ({ layoutClassName }) => {
  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <div className={styles.header}>
        <div className={styles.title}>Aan de slag met OpenCatalogi</div>

        <span className={styles.description}>
          Wilt u uw component op OpenCatalogi aanbieden zodat andere uw component kunnen (her)gebruiken of bij dragen
          aan de doorontwikkeling van uw component?
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          appearance="secondary-action-button"
          onClick={() => navigate("/documentation/usage")}
        >
          <Icon>
            <ArrowRightIcon />
          </Icon>
          Component toevoegen
        </Button>
      </div>
    </div>
  );
};
