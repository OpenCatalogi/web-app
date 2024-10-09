import * as React from "react";
import * as styles from "./DirectoriesTemplate.module.css";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import _ from "lodash";
import { Container, HorizontalOverflowWrapper, Pagination } from "@conduction/components";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import {
  Heading,
  Icon,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@utrecht/component-library-react/dist/css-module";
import { useDirectory } from "../../hooks/directory";
import { navigate } from "gatsby";
import { IconArrowRight } from "@tabler/icons-react";

export const DirectoriesTemplate: React.FC = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = React.useState<any>([]);

  const PAGINATION_LIMIT_DEFAULT = 6;

  const queryClient = new QueryClient();
  const _useSearch = useDirectory(queryClient);
  const getDirectories = _useSearch.getAll(); // Ensure no refetch on resultDisplayLayout change

  const directoriesWithOrganisations = getDirectories.data?.results?.filter(
    (directory: any) =>
      directory.organisation && typeof directory.organisation === "object" && directory.organisation.title,
  );

  const directoriesWithOutOrganisations = getDirectories.data?.results?.filter(
    (directory: any) =>
      (directory.organisation && typeof directory.organisation === "object" && directory.organisation.title === "") ||
      !directory.organisation,
  );

  const directoriesPerOrganisation = (organisationTitle: string) => {
    return directoriesWithOrganisations.filter((directory: any) => directory.organisation.title === organisationTitle);
  };
  const uniqOrganisations = () => {
    const filteredOrganisations =
      directoriesWithOrganisations && getOrganisationFromDirectory(directoriesWithOrganisations, "organisation");
    return _.uniqBy(filteredOrganisations, "title");
  };

  const getOrganisationFromDirectory = (array: any, key: string) => {
    return array.map(function (item: any) {
      return item[key];
    });
  };

  const setOrganisationPagination = (page: any, organisationTitle: string) => {
    const organisationCurrentPage = `${organisationTitle}CurrentPage`;

    setPagination({ ...pagination, [organisationCurrentPage]: page });
  };

  const paginate = (array: any, page_size: number, page_number: number) => {
    if (!array) return;
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const getData = (organisationTitle: string) => {
    return paginate(
      pagination[organisationTitle],
      PAGINATION_LIMIT_DEFAULT,
      pagination[`${organisationTitle}CurrentPage`] ?? 1,
    );
  };

  React.useEffect(() => {
    const obj = {};
    uniqOrganisations().map((organisation: any) => {
      Object.assign(obj, { [organisation.title]: directoriesPerOrganisation(organisation.title) });
    });

    Object.assign(obj, { unknown: directoriesWithOutOrganisations });

    setPagination({ ...pagination, ...obj });
  }, [getDirectories.data]);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.header}>
        <Heading level={2} className={clsx(styles.title, !getDirectories.isSuccess && styles.loading)}>
          {t("Directories")}{" "}
          {getDirectories.data?.results?.length >= 0 ? (
            `(${getDirectories.data.results.length})`
          ) : (
            <>
              (<Skeleton height="1ch" width="1ch" />)
            </>
          )}
        </Heading>
      </div>
      <div>
        {getDirectories.data?.results && getDirectories.data?.results?.length > 0 && (
          <div>
            {uniqOrganisations().map((organisation: any, idx: number) => (
              <div key={idx} className={styles.organisationContainer}>
                <Heading level={3} className={styles.organisationTitle}>
                  {organisation.title}{" "}
                  {directoriesPerOrganisation(organisation.title).length >= 0 ? (
                    `(${directoriesPerOrganisation(organisation.title).length})`
                  ) : (
                    <>
                      (<Skeleton height="1ch" width="1ch" />)
                    </>
                  )}
                </Heading>
                <HorizontalOverflowWrapper
                  ariaLabels={{ scrollLeftButton: t("Scroll left"), scrollRightButton: t("Scroll right") }}
                >
                  <Table className={styles.table}>
                    <TableHeader className={styles.tableHeader}>
                      <TableRow>
                        <TableHeaderCell>{t("Name")}</TableHeaderCell>
                        <TableHeaderCell>{t("Schema")}</TableHeaderCell>
                        <TableHeaderCell>{t("Total amount of metadata")}</TableHeaderCell>

                        <TableHeaderCell />
                      </TableRow>
                    </TableHeader>
                    <TableBody className={styles.tableBody}>
                      {directoriesWithOrganisations.length > 0 &&
                        getData(organisation.title)?.map((directory: any) => (
                          <TableRow
                            className={styles.tableRow}
                            key={directory.id}
                            onClick={() => navigate(`/directories/${directory.id}`)}
                          >
                            <TableCell>
                              <span className={styles.directoryTitle}>{directory.title}</span>
                            </TableCell>
                            <TableCell>
                              <span>{directory._schema}</span>
                            </TableCell>
                            <TableCell>
                              <span>{directory.metadata.length}</span>
                            </TableCell>
                            <TableCell>
                              <Link
                                onClick={() => navigate(`/directories/${directory.id}`)}
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
                      {!directoriesWithOrganisations.length && (
                        <TableRow>
                          <TableCell>{t("No directories found")}</TableCell>
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

                <div className={styles.pagination}>
                  <Pagination
                    layoutClassName={styles.paginationContainer}
                    totalPages={Math.ceil(pagination[organisation.title]?.length / PAGINATION_LIMIT_DEFAULT) ?? 1}
                    currentPage={pagination[`${organisation.title}CurrentPage`] ?? 1}
                    setCurrentPage={(page: any) => setOrganisationPagination(page, organisation.title)}
                    ariaLabels={{
                      pagination: t("Pagination"),
                      nextPage: t("Next page"),
                      previousPage: t("Previous page"),
                      page: t("Page"),
                    }}
                  />
                </div>
              </div>
            ))}
            {
              <>
                <Heading level={3}>
                  {t("Unknown Organisations")}{" "}
                  {directoriesWithOutOrganisations.length >= 0 ? (
                    `(${directoriesWithOutOrganisations.length})`
                  ) : (
                    <>
                      (<Skeleton height="1ch" width="1ch" />)
                    </>
                  )}
                </Heading>
                <HorizontalOverflowWrapper
                  ariaLabels={{ scrollLeftButton: t("Scroll left"), scrollRightButton: t("Scroll right") }}
                >
                  <Table className={styles.table}>
                    <TableHeader className={styles.tableHeader}>
                      <TableRow>
                        <TableHeaderCell>{t("Name")}</TableHeaderCell>
                        <TableHeaderCell>{t("Schema")}</TableHeaderCell>
                        <TableHeaderCell>{t("Total amount of metadata")}</TableHeaderCell>

                        <TableHeaderCell />
                      </TableRow>
                    </TableHeader>
                    <TableBody className={styles.tableBody}>
                      {directoriesWithOutOrganisations.length > 0 &&
                        getData("unknown")?.map((directory: any) => (
                          <TableRow
                            className={styles.tableRow}
                            key={directory.id}
                            onClick={() => navigate(`/directories/${directory.id}`)}
                          >
                            <TableCell>
                              <span className={styles.directoryTitle}>{directory.title}</span>
                            </TableCell>
                            <TableCell>
                              <span>{directory._schema}</span>
                            </TableCell>
                            <TableCell>
                              <span>{directory.metadata.length}</span>
                            </TableCell>
                            <TableCell>
                              <Link
                                onClick={() => navigate(`/directories/${directory.id}`)}
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
                      {!directoriesWithOrganisations.length && (
                        <TableRow>
                          <TableCell>{t("No directories found")}</TableCell>
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

                <div className={styles.pagination}>
                  <Pagination
                    layoutClassName={styles.paginationContainer}
                    totalPages={Math.ceil(pagination.unknown?.length / PAGINATION_LIMIT_DEFAULT ?? 1)}
                    currentPage={pagination.unknownCurrentPage ?? 1}
                    setCurrentPage={(page: any) => setOrganisationPagination(page, "unknown")}
                    ariaLabels={{
                      pagination: t("Pagination"),
                      nextPage: t("Next page"),
                      previousPage: t("Previous page"),
                      page: t("Page"),
                    }}
                  />
                </div>
              </>
            }
          </div>
        )}
      </div>
    </Container>
  );
};
