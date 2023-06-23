import * as React from "react";
import * as styles from "./TableOrganizationDisplayTemplate.module.css";
import _ from "lodash";
import { Icon, DataBadge } from "@utrecht/component-library-react/dist/css-module";
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
import { ToolTip } from "../../../../components/toolTip/ToolTip";
import { getResultsUrl } from "../../../../services/getResultsUrl";
import TableWrapper from "../../../../components/tableWrapper/TableWrapper";
import { Link } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHouseLaptop, faRepeat, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { GitHubLogo } from "../../../../assets/svgs/GitHub";
import { GitLabLogo } from "../../../../assets/svgs/GitLab";

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
    <TableWrapper>
      <Table>
        {!hideTableHead && (
          <TableHeader>
            <TableRow>
              <TableHeaderCell>{t("Name")}</TableHeaderCell>
              <TableHeaderCell>{t("Sources")}</TableHeaderCell>
              <TableHeaderCell className={styles.tagsHeader}>
                {t("Owned, suppored and used components")}
              </TableHeaderCell>
              <TableHeaderCell>{t("Website")}</TableHeaderCell>
              <TableHeaderCell>{t("GitHub/Gitlab")}</TableHeaderCell>
              <TableHeader />
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
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
                  <ToolTip tooltip={t("Sources")}>
                    <DataBadge className={styles.tagWidth}>
                      {_.upperFirst(
                        organization._self?.synchronizations
                          ? organization._self?.synchronizations?.length
                            ? organization._self?.synchronizations?.at(-1)?.gateway.name
                            : "Onbekend"
                          : "N.V.T.",
                      )}
                    </DataBadge>
                  </ToolTip>
                </TableCell>

                <TableCell>
                  <div className={styles.tags}>
                    <ToolTip tooltip="Aantal eigen componenten">
                      <DataBadge>
                        <FontAwesomeIcon icon={faHouseLaptop} />
                        {organization.owns?.length.toString() ?? "0"}
                      </DataBadge>
                    </ToolTip>
                    <ToolTip tooltip="Aantal ondersteunde componenten">
                      <DataBadge>
                        <FontAwesomeIcon icon={faUserCog} />
                        {organization.supported?.length.toString() ?? "0"}
                      </DataBadge>
                    </ToolTip>

                    <ToolTip tooltip="Aantal gebruikte componenten">
                      <DataBadge>
                        <FontAwesomeIcon icon={faRepeat} />
                        {organization.used?.length.toString() ?? "0"}
                      </DataBadge>
                    </ToolTip>
                  </div>
                </TableCell>

                <TableCell>
                  <ToolTip tooltip={organization.website ?? t("Website")}>
                    <DataBadge onClick={() => open(organization.website)}>
                      {organization.website && <FontAwesomeIcon icon={faGlobe} />}
                      {_.upperFirst(organization.website ? t("Website") : t("No website found"))}
                    </DataBadge>
                  </ToolTip>
                </TableCell>
                <TableCell>
                  {organization.github && (
                    <ToolTip tooltip="GitHub">
                      <DataBadge onClick={() => open(organization.github)}>
                        <GitHubLogo />
                        {t("GitHub")}
                      </DataBadge>
                    </ToolTip>
                  )}

                  {organization.gitlab && (
                    <ToolTip tooltip="GitLab">
                      <DataBadge onClick={() => open(organization.gitlab)}>
                        <GitLabLogo />
                        {t("GitLab")}
                      </DataBadge>
                    </ToolTip>
                  )}

                  {!organization.github && !organization.gitlab && (
                    <ToolTip tooltip={t("Repository")}>
                      <DataBadge>{t("No repository found")}</DataBadge>
                    </ToolTip>
                  )}
                </TableCell>

                <TableCell>
                  <Link
                    to={`/${getResultsUrl(organization._self?.schema?.ref)}/${organization.id}`}
                    className={styles.detailsLink}
                    rel="activate-row"
                  >
                    <Icon className="utrecht-icon--conduction-start">
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
    </TableWrapper>
  );
};
