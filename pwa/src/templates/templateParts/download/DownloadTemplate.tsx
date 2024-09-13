import * as React from "react";
import * as styles from "./DownloadTemplate.module.css";
import clsx from "clsx";
import { NotificationPopUp as _NotificationPopUp } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faArrowLeft,
  faDatabase,
  faDownload,
  faFileAudio,
  faFileCsv,
  faFileImage,
  faFilePdf,
  faFileVideo,
  faFileWord,
  faFileZipper,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useGatsbyContext } from "../../../context/gatsby";
import { TOOLTIP_ID } from "../../../layout/Layout";
import { Button, Heading3, Paragraph } from "@utrecht/component-library-react";
import _ from "lodash";

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
    label: download.naam ?? download.label,
    size: getSize(download.grootte ?? download.size),
    type: download.type,
    downloadLink: download.url ?? download.downloadLink,
  }));

  const getIconFromType = (type: any) => {
    switch (_.toUpper(type)) {
      case "PDF":
        return faFilePdf;
      case "DOC":
      case "DOCX":
      case "RTF":
      case "TXT":
        return faFileWord;
      case "CSV":
        return faFileCsv;
      case "JPG":
      case "PNG":
      case "SVG":
      case "GIF":
        return faFileImage;
      case "MP3":
      case "WAV":
        return faFileAudio;
      case "MP4":
      case "AVI":
      case "MPG":
      case "MPEG":
      case "MOV":
        return faFileVideo;
      case "7Z":
      case "ZIP":
      case "RAR":
        return faFileZipper;
      default:
        return faDatabase;
    }
  };

  return (
    <div className={clsx([layoutClassName && layoutClassName], screenSize === "mobile" && styles.downloadName)}>
      {convertedDownloads.map(({ label, size, type, downloadLink }, idx) => (
        <React.Fragment key={idx}>
          <Button appearance="secondary-action-button" onClick={() => setVisibleItemIdx(idx)}>
            <FontAwesomeIcon icon={faDownload} />
            {t("Download")} {label ?? downloadLink.substring(downloadLink.lastIndexOf("/") + 1)}
          </Button>

          {visibleItemIdx === idx && (
            <div className={styles.overlay}>
              <NotificationPopUp
                isVisible
                hide={() => setVisibleItemIdx(-1)}
                title={`${t("Warning")}!`}
                customContent={
                  <div>
                    <div className={styles.content}>
                      <div className={styles.icon}>{<FontAwesomeIcon icon={icon ?? getIconFromType(type)} />}</div>
                      <Heading3
                        data-tooltip-id={TOOLTIP_ID}
                        data-tooltip-content={downloadLink}
                        className={styles.title}
                      >
                        {label ?? downloadLink.substring(downloadLink.lastIndexOf("/") + 1)}
                      </Heading3>
                      <div>
                        ({_.toUpper(type ?? downloadLink.substring(downloadLink.lastIndexOf(".") + 1))}
                        {size && `, ${size}`})
                      </div>
                    </div>
                    <Paragraph>
                      {t(
                        "This file comes from a 3rd party and can potentially be harmfull for your PC. Are you sure you want to download this?",
                      )}
                    </Paragraph>
                  </div>
                }
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
