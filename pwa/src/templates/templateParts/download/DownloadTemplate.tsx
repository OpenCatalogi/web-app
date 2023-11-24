import * as React from "react";
import * as styles from "./DownloadTemplate.module.css";
import clsx from "clsx";
import { DownloadCard, NotificationPopUp as _NotificationPopUp } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../context/gatsby";

interface DownloadTemplateProps {
  items: DownloadProps[];
  backUrl: string;
  icon?: JSX.Element;
  layoutClassName?: string;
}

export interface DownloadProps {
  label: string;
  type: string;
  size: string;
  downloadLink: string;
}

export const DownloadTemplate: React.FC<DownloadTemplateProps> = ({ items, backUrl, icon, layoutClassName }) => {
  const { t } = useTranslation();
  const { screenSize } = useGatsbyContext();
  const [isVisible, setIsVisible] = React.useState<any>({});

  const toggleVisibility = (label: string) => {
    setIsVisible({
      [label]: {
        value: true,
      },
    });
  };

  const NotificationPopUp = _NotificationPopUp.NotificationPopUp;

  return (
    <div className={clsx([layoutClassName && layoutClassName], screenSize === "mobile" && styles.downloadName)}>
      {items.map(({ label, size, type, downloadLink }) => (
        <>
          <DownloadCard
            label={label ?? downloadLink}
            type={type ?? downloadLink.substring(downloadLink.lastIndexOf(".") + 1)}
            {...{ size, icon }}
            handleClick={() => {
              toggleVisibility(label ?? downloadLink);
            }}
          />

          {isVisible[label ?? downloadLink]?.value && (
            <div className={styles.overlay}>
              <NotificationPopUp
                isVisible={isVisible[label ?? downloadLink]?.value}
                hide={() => setIsVisible(false)}
                title={`${t("Warning")}!`}
                description={t(
                  "This file comes from a 3rd party and can potentially be harmfull for your PC. Are you sure you want to download this?",
                )}
                primaryButton={{
                  label: "Download",
                  icon: <FontAwesomeIcon icon={faDownload} />,
                  handleClick: () => open(downloadLink),
                }}
                secondaryButton={{
                  label: t("Go back"),
                  icon: <FontAwesomeIcon icon={faArrowLeft} />,
                  href: `${backUrl}`,
                  handleClick: () => ({}),
                }}
                layoutClassName={styles.popup}
              />
            </div>
          )}
        </>
      ))}
    </div>
  );
};
