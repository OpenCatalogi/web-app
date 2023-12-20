import * as React from "react";
import * as styles from "./DownloadTemplate.module.css";
import clsx from "clsx";
import { DownloadCard, NotificationPopUp as _NotificationPopUp } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../context/gatsby";
import { TOOLTIP_ID } from "../../../layout/Layout";

interface DownloadTemplateProps {
  downloads: TDownloadableItem[];
  backUrl: string;
  icon?: IconDefinition;
  layoutClassName?: string;
}

type TDownloadableItem = {
  label: string;
  type: string;
  size: string;
  downloadLink: string;
};

export const DownloadTemplate: React.FC<DownloadTemplateProps> = ({ downloads, backUrl, icon, layoutClassName }) => {
  const { t } = useTranslation();
  const { screenSize } = useGatsbyContext();
  const [visibleItemIdx, setVisibleItemIdx] = React.useState<number>(-1);

  const NotificationPopUp = _NotificationPopUp.NotificationPopUp;

  const getSize = (size: number): string => {
    if (size < 0) return t("Unknown size");
    return `${size / 1000}kB`;
  };

  const convertedDownloads: TDownloadableItem[] = downloads.map((download: any) => ({
    label: download.naam,
    size: getSize(download.grootte),
    type: download.type,
    downloadLink: download.url,
  }));

  return (
    <div className={clsx([layoutClassName && layoutClassName], screenSize === "mobile" && styles.downloadName)}>
      {convertedDownloads.map(({ label, size, type, downloadLink }, idx) => (
        <React.Fragment key={idx}>
          <DownloadCard
            label={label ?? downloadLink.substring(downloadLink.lastIndexOf("/") + 1)}
            labelTooltip={{ id: TOOLTIP_ID, tooltip: downloadLink }}
            type={type ?? downloadLink.substring(downloadLink.lastIndexOf(".") + 1)}
            {...{ size, icon }}
            handleClick={() => {
              setVisibleItemIdx(idx);
            }}
          />

          {visibleItemIdx === idx && (
            <div className={styles.overlay}>
              <NotificationPopUp
                isVisible
                hide={() => setVisibleItemIdx(-1)}
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
                  href: backUrl,
                  handleClick: () => ({}),
                }}
                layoutClassName={styles.popup}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
