import * as React from "react";
import * as styles from "./PublicationsTableTemplate.module.css";
import { DataBadge } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
} from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../../layout/Layout";
import { HorizontalOverflowWrapper } from "@conduction/components";

interface PublicationsTableTemplateProps {
  publications: any[];
  hideTableHead?: boolean;
}

export const PublicationsTableTemplate: React.FC<PublicationsTableTemplateProps> = ({
  publications,
  hideTableHead,
}) => {
  const { t } = useTranslation();

  return (
    <HorizontalOverflowWrapper
      ariaLabels={{ scrollLeftButton: t("Scroll left"), scrollRightButton: t("Scroll right") }}
    >
      <Table className={styles.table}>
        {!hideTableHead && (
          <TableHeader className={styles.tableHeader}>
            <TableRow>
            <TableHeaderCell>{t("Name")}</TableHeaderCell>
            <TableHeaderCell>{t("Description")}</TableHeaderCell>
              <TableHeaderCell>{t("Published")}</TableHeaderCell>
            </TableRow>
          </TableHeader>
        )}

        <TableBody className={styles.tableBody}>
          {publications.length > 0 &&
            publications.map((publication) => (
              <TableRow
                className={styles.tableRow}
                key={publication.id}
                onClick={() => navigate(`/publications/${publication.id}`)}
              >
                <TableCell>
                  <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={publication?.title} className={styles.name}>
                    {publication?.title}
                  </span>
                </TableCell>

                <TableCell>
                  <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={publication?.description} className={styles.name}>
                    {publication?.description}
                  </span>
                </TableCell>

                <TableCell>
                  <DataBadge
                    className={styles.tagWidth}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={t("Published")}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    {publication.data?.published}
                  </DataBadge>
                </TableCell>

                {/* <TableCell>
                  <Link onClick={() => navigate(`/publications/${publication.id}`)} className={styles.detailsLink}>
                    <Icon>
                      <IconArrowRight />
                    </Icon>
                    {t("Details")}
                  </Link>
                </TableCell> */}
              </TableRow>
            ))}

          {!publications.length && (
            <TableRow>
              <TableCell>{t("Geen resultaten gevonden")}</TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </HorizontalOverflowWrapper>
  );
};
