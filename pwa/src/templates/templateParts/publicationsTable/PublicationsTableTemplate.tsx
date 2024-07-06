import * as React from "react";
import * as styles from "./PublicationsTableTemplate.module.css";
import _ from "lodash";
import { Icon, StatusBadge, DataBadge, Link } from "@utrecht/component-library-react/dist/css-module";
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
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import { getResultsUrl } from "../../../services/getResultsUrl";
import { getTypeFromSchemaRef } from "../../../services/getTypeFromSchemaRef";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faInfoCircle, faLayerGroup, faMedal, faUpload } from "@fortawesome/free-solid-svg-icons";
import { TOOLTIP_ID } from "../../../layout/Layout";
import { getStatusColor } from "../../../services/getStatusColor";
import { HorizontalOverflowWrapper } from "@conduction/components";
import { RatingIndicatorTemplate } from "../ratingIndicator/RatingIndicatorTemplate";
import { getCommongroundRating } from "../../../services/getCommongroundRating";
import { getSoftwareTypeLabel } from "../../../services/getSoftwareTypeLabel";

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
              <TableHeaderCell>{t("Catalogi")}</TableHeaderCell>
              <TableHeaderCell>{t("MetaData")}</TableHeaderCell>
              <TableHeaderCell>{t("Status")}</TableHeaderCell>
              <TableHeaderCell>{t("Published")}</TableHeaderCell>
              <TableHeaderCell>{t("Organization")}</TableHeaderCell>
              <TableHeaderCell />
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
                  <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={publication.title} className={styles.name}>
                    {publication.title}
                  </span>
                </TableCell>

                <TableCell>
                  <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("Catalogi")} className={styles.name}>
                    {t(_.upperFirst(publication.catalogi?.name))}
                  </span>
                </TableCell>

                <TableCell>
                  <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={t("MetaData")} className={styles.name}>
                    {t(_.upperFirst(publication.metaData?.name))}
                  </span>
                </TableCell>

                <TableCell>
                  <DataBadge
                    className={styles.tagWidth}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={t("Status")}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {t(_.upperFirst(publication.data?.status))}
                  </DataBadge>
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

                <TableCell>
                  <DataBadge
                    className={styles.tagWidth}
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content="Organisatie"
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    {publication.data?.organization?.title}
                  </DataBadge>
                </TableCell>

                <TableCell>
                  <Link onClick={() => navigate(`/publications/${publication.id}`)} className={styles.detailsLink}>
                    <Icon>
                      <IconArrowRight />
                    </Icon>
                    {t("Details")}
                  </Link>
                </TableCell>
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
