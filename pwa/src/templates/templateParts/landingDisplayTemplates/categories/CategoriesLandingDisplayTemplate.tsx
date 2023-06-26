import * as React from "react";
import * as styles from "./CategoriesLandingDisplayTemplate.module.css";
import { Button } from "@utrecht/component-library-react/dist/css-module";
import { Heading, Paragraph, Icon } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../../../../components/categoryCard/CategoryCard";
import { IconArrowRight } from "@tabler/icons-react";
import { TEMPORARY_DOMAINS } from "../../../../data/domains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTags } from "@fortawesome/free-solid-svg-icons";
import { TEMPORARY_PORTFOLIOS } from "../../../../data/portfolio";
import Collapsible from "react-collapsible";
import { GatsbyContext } from "../../../../context/gatsby";
import clsx from "clsx";
import { ButtonLink, Link } from "../../../../components";

export const CategoriesLandingDisplayTemplate = (): JSX.Element => {
  const { t } = useTranslation();

  const domains = TEMPORARY_DOMAINS;
  const categories = TEMPORARY_PORTFOLIOS;

  const [showMore, setShowMore] = React.useState(domains.map(() => false));

  const { screenSize } = React.useContext(GatsbyContext);

  return (
    <>
      <div className={styles.subHeading}>
        <Heading level={2} className={styles.title}>
          {t("Categories")}
        </Heading>

        <Paragraph className={styles.description}>
          Voor onderstaande gemeentelijke producten en diensten zijn Common Ground oplossingen beschikbaar.
        </Paragraph>
      </div>

      <div className={styles.componentsGrid}>
        {domains.map((domain, index) => (
          <CategoryCard
            key={index}
            title={{ label: t(domain.title), href: `/categories#${domain.title}` }}
            description={
              <div>
                {categories
                  .filter((category) => category.domain === domain.title)
                  .slice(0, 5)
                  .map((_category, idx) => (
                    <div key={idx}>
                      <div>
                        <Link to={`/categories/${_category.id}`}>
                          <Icon className="utrecht-icon--conduction-start">
                            <IconArrowRight />
                          </Icon>
                          <span>{_category.title}</span>
                        </Link>
                      </div>
                    </div>
                  ))}

                {screenSize !== "mobile" &&
                  categories.filter((category) => category.domain === domain.title).slice(5).length > 0 &&
                  categories
                    .filter((category) => category.domain === domain.title)
                    .slice(5)
                    .map((_category, idx) => (
                      <div key={idx}>
                        <div>
                          <Link to={`/categories/${_category.id}`}>
                            <Icon className="utrecht-icon--conduction-start">
                              <IconArrowRight />
                            </Icon>
                            <span>{_category.title}</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                {screenSize === "mobile" &&
                  categories.filter((category) => category.domain === domain.title).slice(5).length > 0 && (
                    <>
                      <Collapsible trigger={<></>} open={showMore[index]} transitionTime={200}>
                        {categories
                          .filter((category) => category.domain === domain.title)
                          .slice(5)
                          .map((_category, idx) => (
                            <div key={idx}>
                              <div>
                                <Link to={`/categories/${_category.id}`}>
                                  <Icon className="utrecht-icon--conduction-start">
                                    <IconArrowRight />
                                  </Icon>
                                  <span>{_category.title}</span>
                                </Link>
                              </div>
                            </div>
                          ))}
                      </Collapsible>

                      <Button
                        className={styles.showMoreButton}
                        appearance="secondary-action-button"
                        onClick={() => setShowMore(Object.values<boolean>({ ...showMore, [index]: !showMore[index] }))}
                      >
                        <span>{showMore[index] ? "show less" : "show more"}</span>
                        <FontAwesomeIcon
                          className={clsx(styles.toggleIcon, showMore[index] && styles.isOpen)}
                          icon={faChevronRight}
                        />
                      </Button>
                    </>
                  )}
              </div>
            }
            icon={<FontAwesomeIcon icon={faTags} />}
            domain={true}
          />
        ))}
      </div>

      <ButtonLink to="/categories">
        <IconArrowRight /> Bekijk alle categorieën
      </ButtonLink>
    </>
  );
};
