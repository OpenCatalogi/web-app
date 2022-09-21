import * as React from "react";
import * as styles from "./DownloadTemplate.module.css";

import { DownloadCard, NotificationPopUp as _NotificationPopUp } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ArrowLeftIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";

interface DownloadTemplateProps {
  icon: JSX.Element;
  label: string;
  sizeKb: string;
  layoutClassName?: string;
}

export const DownloadTemplate: React.FC<DownloadTemplateProps> = ({ layoutClassName, icon, label, sizeKb }) => {
  const { t } = useTranslation();
  const NotificationPopUpController = _NotificationPopUp.controller;
  const NotificationPopUp = _NotificationPopUp.NotificationPopUp;

  const { isVisible, show, hide } = NotificationPopUpController();

  return (
    <div className={layoutClassName && layoutClassName}>
      <DownloadCard
        label={label}
        sizeKb={sizeKb}
        downloadLabel="Download"
        icon={icon}
        handleClick={() => {
          show();
        }}
      />

      {isVisible && (
        <div className={styles.overlay}>
          <NotificationPopUp
            {...{ hide, isVisible }}
            title={`${t("Warning")}!`}
            description={t(
              "This file comes from a 3rd party and can potentially be harmfull for your PC. Are you sure you want to download this?",
            )}
            primaryButton={{
              label: "Download",
              icon: <FontAwesomeIcon icon={faDownload} />,
              handleClick: () => {},
            }}
            secondaryButton={{
              label: t("Go back"),
              icon: <ArrowLeftIcon />,
              handleClick: () => {},
            }}
            layoutClassName={styles.notification}
          />
        </div>
      )}
    </div>
  );
};
