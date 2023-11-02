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
import { useResultDisplayLayoutContext } from "../../context/resultDisplayLayout";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { navigate } from "gatsby-link";

interface CategoryDetailTemplateProps {
  categoryId: string;
}

export const CategoryDetailTemplate: React.FC<CategoryDetailTemplateProps> = ({ categoryId }) => {
  const { resultDisplayLayout, setResultDisplayLayout } = useResultDisplayLayoutContext();
  const { t } = useTranslation();

  const portfolio = TEMPORARY_PORTFOLIOS.find((category) => {
    return category.id === categoryId;
  });
  const domain =
    portfolio &&
    TEMPORARY_DOMAINS.find((domain) => {
      return domain.title === portfolio.domain;
    });

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton}>
        <Link
          onClick={(e) => {
            e.preventDefault(), navigate("/categories");
          }}
          href="/categories"
        >
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

      {resultDisplayLayout.catagoryDisplayLayout && (
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
                pressed={resultDisplayLayout.catagoryDisplayLayout === "table"}
                appearance={
                  resultDisplayLayout.catagoryDisplayLayout === "table" ? "secondary-action-button" : "subtle-button"
                }
                onClick={() => setResultDisplayLayout({ ...resultDisplayLayout, catagoryDisplayLayout: "table" })}
              >
                <Icon>
                  <FontAwesomeIcon icon={faTable} />
                </Icon>{" "}
                {t("Table")}
              </Button>
              <Button
                pressed={resultDisplayLayout.catagoryDisplayLayout === "cards"}
                appearance={
                  resultDisplayLayout.catagoryDisplayLayout === "cards" ? "secondary-action-button" : "subtle-button"
                }
                onClick={() => setResultDisplayLayout({ ...resultDisplayLayout, catagoryDisplayLayout: "cards" })}
              >
                <Icon>
                  <FontAwesomeIcon icon={faGripVertical} />
                </Icon>{" "}
                {t("Cards")}
              </Button>
              <Button
                pressed={resultDisplayLayout.catagoryDisplayLayout === "layer"}
                appearance={
                  resultDisplayLayout.catagoryDisplayLayout === "layer" ? "secondary-action-button" : "subtle-button"
                }
                onClick={() => setResultDisplayLayout({ ...resultDisplayLayout, catagoryDisplayLayout: "layer" })}
              >
                <Icon>
                  <FontAwesomeIcon icon={faLayerGroup} />
                </Icon>{" "}
                {t("Layers")}
              </Button>
            </ButtonGroup>
          </div>

          <div className={styles.results}>
            <ComponentResultTemplate components={[]} type={resultDisplayLayout.catagoryDisplayLayout} />
          </div>
        </div>
      )}

      {!portfolio && <Skeleton height="200px" />}
    </Container>
  );
};
