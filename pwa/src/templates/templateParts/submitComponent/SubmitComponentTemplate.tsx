import * as React from "react";
import * as styles from "./SubmitComponentTemplate.module.css";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { Button } from "@gemeente-denhaag/components-react";
import clsx from "clsx";
import { navigate } from "gatsby";

interface SubmitComponentTemplateProps {
  layoutClassName?: string;
}

export const SubmitComponentTemplate: React.FC<SubmitComponentTemplateProps> = ({ layoutClassName }) => {
  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <span className={styles.heading}>Aan de slag met Open Catalogi</span>

      <span className={styles.description}>
        Wilt u uw component op Open Catalogi aanbieden zodat andere uw component kunnen (her)gebruiken of bij dragen aan
        de doorontwikkeling van uw component?
      </span>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          variant="secondary-action"
          onClick={() => navigate("/documentation/usage")}
          icon={<ArrowRightIcon />}
        >
          Voeg Component toe!
        </Button>
      </div>
    </div>
  );
};
