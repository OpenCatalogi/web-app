import * as React from "react";
import * as styles from "./TableOrganizationDisplayTemplate.module.css";
import _ from "lodash";
import { Icon, DataBadge, Link } from "@utrecht/component-library-react/dist/css-module";
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
import { getResultsUrl } from "../../../../services/getResultsUrl";
import { HorizontalOverflowWrapper } from "@conduction/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHouseLaptop, faInfoCircle, faRepeat, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../../../assets/svgs/GitHub";
import { GitLabLogo } from "../../../../assets/svgs/GitLab";
import { TOOLTIP_ID } from "../../../../layout/Layout";

interface TableOrganizationDisplayTemplateProps {
  organizations: any[];
  hideTableHead?: boolean;
}

export const TableOrganizationDisplayTemplate: React.FC<TableOrganizationDisplayTemplateProps> = ({
  organizations,
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
              <TableHeaderCell>{t("Sources")}</TableHeaderCell>
              <TableHeaderCell
                data-tooltip-id={TOOLTIP_ID}
                data-tooltip-content={t("Owned, supported and used components")}
                className={styles.componentsHeader}
              >
                {t("Components")}
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              </TableHeaderCell>
              <TableHeaderCell>{t("Website")}</TableHeaderCell>
              <TableHeaderCell>{t("GitHub/Gitlab")}</TableHeaderCell>
              <TableHeaderCell />
            </TableRow>
          </TableHeader>
        )}

        <TableBody className={styles.tableBody}>
          {organizations.length > 0 &&
            organizations.map((organization) => (
              <TableRow
                className={styles.tableRow}
                key={organization.id}
                onClick={() => navigate(`/${getResultsUrl(organization._self?.schema.ref)}/${organization.id}`)}
              >
                <TableCell>
                  <span className={styles.name}>{organization.name}</span>
                </TableCell>

                <TableCell>
                  <DataBadge
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={t("Sources")}
                    className={styles.tagWidth}
                  >
                    {_.upperFirst(
                      organization._self?.synchronizations
                        ? organization._self?.synchronizations?.length
                          ? organization._self?.synchronizations?.at(-1)?.source.name
                          : "Onbekend"
                        : "N.V.T.",
                    )}
                  </DataBadge>
                </TableCell>

                <TableCell>
                  <div className={styles.tags}>
                    <DataBadge
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content="Aantal eigen componenten"
                      className={styles.tagWidth}
                    >
                      <FontAwesomeIcon icon={faHouseLaptop} />
                      {organization.owns?.length.toString() ?? "0"}
                    </DataBadge>
                    <DataBadge
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content="Aantal ondersteunde componenten"
                      className={styles.tagWidth}
                    >
                      <FontAwesomeIcon icon={faUserCog} />
                      {organization.supported?.length.toString() ?? "0"}
                    </DataBadge>

                    <DataBadge
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content="Aantal gebruikte componenten"
                      className={styles.tagWidth}
                    >
                      <FontAwesomeIcon icon={faRepeat} />
                      {organization.used?.length.toString() ?? "0"}
                    </DataBadge>
                  </div>
                </TableCell>

                <TableCell>
                  <DataBadge
                    data-tooltip-id={TOOLTIP_ID}
                    data-tooltip-content={organization.website ?? t("Website")}
                    className={styles.tagWidth}
                    onClick={() => open(organization.website)}
                  >
                    {organization.website && <FontAwesomeIcon icon={faGlobe} />}
                    {_.upperFirst(organization.website ? t("Website") : t("Not found"))}
                  </DataBadge>
                </TableCell>
                <TableCell>
                  {organization.github && (
                    <DataBadge
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content="GitHub"
                      className={styles.tagWidth}
                      onClick={() => open(organization.github)}
                    >
                      <GitHubLogo />
                      {t("GitHub")}
                    </DataBadge>
                  )}

                  {organization.gitlab && (
                    <DataBadge
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content="GitLab"
                      className={styles.tagWidth}
                      onClick={() => open(organization.gitlab)}
                    >
                      <GitLabLogo />
                      {t("GitLab")}
                    </DataBadge>
                  )}

                  {!organization.github && !organization.gitlab && (
                    <DataBadge
                      data-tooltip-id={TOOLTIP_ID}
                      data-tooltip-content={t("Repository")}
                      className={styles.tagWidth}
                    >
                      {t("Not found")}
                    </DataBadge>
                  )}
                </TableCell>

                <TableCell>
                  <Link
                    onClick={() => navigate(`/${getResultsUrl(organization._self?.schema?.ref)}/${organization.id}`)}
                    className={styles.detailsLink}
                  >
                    <Icon>
                      <IconArrowRight />
                    </Icon>
                    {t("Details")}
                  </Link>
                </TableCell>
              </TableRow>
            ))}

          {!organizations.length && (
            <TableRow>
              <TableCell>{t("Geen resultaten gevonden")}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </HorizontalOverflowWrapper>
  );
};
