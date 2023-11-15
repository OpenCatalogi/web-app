import * as React from "react";
import * as styles from "./CategoryDetailTemplate.module.css";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import { BadgeCounter, Heading, Icon, DataBadge, Link } from "@utrecht/component-library-react/dist/css-module";
import { Container, DisplaySwitch } from "@conduction/components";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { TEMPORARY_PORTFOLIOS } from "../../data/portfolio";
import { TEMPORARY_DOMAINS } from "../../data/domains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { useResultDisplayLayoutContext } from "../../context/resultDisplayLayout";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { ExpandableLeadParagraph } from "../../components/expandableLeadParagraph/ExpandableLeadParagraph";
import { navigate } from "gatsby-link";
import { IDisplaySwitchButton } from "@conduction/components/lib/components/displaySwitch/DisplaySwitch";

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

  const displaySwitchButtons: IDisplaySwitchButton[] = [
    {
      label: t("Table"),
      pressed: resultDisplayLayout.catagoryDisplayLayout === "table",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, catagoryDisplayLayout: "table" }),
      icon: {
        name: "table",
        prefix: "fas",
      },
    },
    {
      label: t("Cards"),
      pressed: resultDisplayLayout.catagoryDisplayLayout === "cards",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, catagoryDisplayLayout: "cards" }),
      icon: {
        name: "grip-vertical",
        prefix: "fas",
      },
    },
    {
      label: t("Layer"),
      pressed: resultDisplayLayout.catagoryDisplayLayout === "layer",
      handleClick: () => setResultDisplayLayout({ ...resultDisplayLayout, catagoryDisplayLayout: "layer" }),
      icon: {
        name: "layer-group",
        prefix: "fas",
      },
    },
  ];

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
            <span className={clsx(0 >= 100 && styles.maxNumber)}>
              <div className={styles.categoryTitle}>
                <Heading level={3} className={styles.title}>
                  {t("Solutions")}
                </Heading>
                <BadgeCounter>{0}</BadgeCounter>
              </div>
            </span>

            <DisplaySwitch buttons={displaySwitchButtons} />
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
