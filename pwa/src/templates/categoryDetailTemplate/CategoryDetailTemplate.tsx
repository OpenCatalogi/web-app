import * as React from "react";
import * as styles from "./CategoryDetailTemplate.module.css";
import {
  BadgeCounter,
  Heading,
  Icon,
  Button,
  ButtonGroup,
  DataBadge,
  Link,
} from "@utrecht/component-library-react/dist/css-module";
import { Container } from "@conduction/components";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import Skeleton from "react-loading-skeleton";
import { TEMPORARY_DOMAINS } from "../../data/domains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faLayerGroup, faTable, faTags } from "@fortawesome/free-solid-svg-icons";
import { FiltersContext } from "../../context/filters";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { navigate } from "gatsby-link";

interface CategoryDetailTemplateProps {
  categoryId: string;
}

export const CategoryDetailTemplate: React.FC<CategoryDetailTemplateProps> = ({ categoryId }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);
  const { t } = useTranslation();

  const portfolio = TEMPORARY_PORTFOLIOS.find((category) => {
    return category.id === categoryId;
  });
  const domain =
    portfolio &&
    TEMPORARY_DOMAINS.find((domain) => {
      return domain.title === portfolio.domain;
    });

  React.useEffect(() => {
    setFilters({ ...filters, catagoryDisplayLayout: "table" });
  }, []);

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton}>
        <Link onClick={() => navigate("/categories")}>
          <Icon>
            <IconArrowLeft />
          </Icon>
          {t("Back to categories")}
        </Link>
      </div>

      {portfolio && domain && (
        <div className={styles.header}>
          <Heading level={1} className={styles.title}>
            {portfolio.title}
          </Heading>

          <DataBadge>
            <FontAwesomeIcon icon={faTags} />
            {t(domain.title)}
          </DataBadge>

          <ExpandableLeadParagraph description={portfolio.longDescription} />
        </div>
      )}

      {filters.catagoryDisplayLayout && (
        <div className={styles.solutions}>
          <div className={styles.solutionsHeader}>
            <span className={0 >= 100 && styles.maxNumber}>
              <div className={styles.categoryTitle}>
                <Heading level={3} className={styles.title}>
                  {t("Solutions")}
                </Heading>
                <BadgeCounter>{0}</BadgeCounter>
              </div>
            </span>

            <ButtonGroup className={styles.resultsDisplaySwitchButtons}>
              <Button
                pressed={filters.catagoryDisplayLayout === "table"}
                appearance={filters.catagoryDisplayLayout === "table" ? "secondary-action-button" : "subtle-button"}
                onClick={() => setFilters({ ...filters, catagoryDisplayLayout: "table" })}
              >
                <Icon>
                  <FontAwesomeIcon icon={faTable} />
                </Icon>{" "}
                {t("Table")}
              </Button>
              <Button
                pressed={filters.catagoryDisplayLayout === "cards"}
                appearance={filters.catagoryDisplayLayout === "cards" ? "secondary-action-button" : "subtle-button"}
                onClick={() => setFilters({ ...filters, catagoryDisplayLayout: "cards" })}
              >
                <Icon>
                  <FontAwesomeIcon icon={faGripVertical} />
                </Icon>{" "}
                {t("Cards")}
              </Button>
              <Button
                pressed={filters.catagoryDisplayLayout === "layer"}
                appearance={filters.catagoryDisplayLayout === "layer" ? "secondary-action-button" : "subtle-button"}
                onClick={() => setFilters({ ...filters, catagoryDisplayLayout: "layer" })}
              >
                <Icon>
                  <FontAwesomeIcon icon={faLayerGroup} />
                </Icon>{" "}
                {t("Layers")}
              </Button>
            </ButtonGroup>
          </div>

          <div className={styles.results}>
            <ComponentResultTemplate components={[]} type={filters.catagoryDisplayLayout} />
          </div>
        </div>
      )}

      {!portfolio && <Skeleton height="200px" />}
    </Container>
  );
};
