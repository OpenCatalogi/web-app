import * as React from "react";
import * as styles from "./CategoriesLandingDisplayTemplate.module.css";
import { Button, Heading2, LeadParagraph } from "@gemeente-denhaag/components-react";
import { Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../../../../components/categoryCard/CategoryCard";
import { navigate, Link as GatsbyLink } from "gatsby";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { TEMPORARY_DOMAINS } from "../../../../data/domains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTags } from "@fortawesome/free-solid-svg-icons";
import { TEMPORARY_PORTFOLIOS } from "../../../../data/portfolio";
import Collapsible from "react-collapsible";
import { GatsbyContext } from "../../../../context/gatsby";
import clsx from "clsx";

export const CategoriesLandingDisplayTemplate = (): JSX.Element => {
  const { t } = useTranslation();

  const domains = TEMPORARY_DOMAINS;
  const categories = TEMPORARY_PORTFOLIOS;

  const [showMore, setShowMore] = React.useState(domains.map(() => false));

  const { screenSize } = React.useContext(GatsbyContext);

  return (
    <>
      <div className={styles.subHeading}>
        <Heading2 className={styles.title}>{t("Categories")}</Heading2>

        <LeadParagraph className={styles.description}>
          Voor onderstaande gemeentelijke producten en diensten zijn Common Ground oplossingen beschikbaar.
        </LeadParagraph>
      </div>

      <div className={styles.ComponentsGrid}>
        {domains.map((domain, index) => (
          <CategoryCard
            title={{ label: t(domain.title), href: `/categories#${domain.title}` }}
            description={
              <div>
                {categories
                  .filter((category) => category.domain === domain.title)
                  .slice(0, 5)
                  .map((_category) => (
                    <div>
                      <div>
                        <GatsbyLink to={`/categories/${_category.id}`}>
                          <Link>
                            <Icon className="utrecht-icon--conduction-start">
                              <ArrowRightIcon />
                            </Icon>
                            {_category.title}
                          </Link>
                        </GatsbyLink>
                      </div>
                    </div>
                  ))}

                {screenSize !== "mobile" &&
                  categories.filter((category) => category.domain === domain.title).slice(5).length > 0 &&
                  categories
                    .filter((category) => category.domain === domain.title)
                    .slice(5)
                    .map((_category) => (
                      <div>
                        <div>
                          <GatsbyLink to={`/categories/${_category.id}`}>
                            <Link>
                              <Icon className="utrecht-icon--conduction-start">
                                <ArrowRightIcon />
                              </Icon>
                              {_category.title}
                            </Link>
                          </GatsbyLink>
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
                          .map((_category) => (
                            <div>
                              <div>
                                <GatsbyLink to={`/categories/${_category.id}`}>
                                  <Link>
                                    <Icon className="utrecht-icon--conduction-start">
                                      <ArrowRightIcon />
                                    </Icon>
                                    {_category.title}
                                  </Link>
                                </GatsbyLink>
                              </div>
                            </div>
                          ))}
                      </Collapsible>

                      <Button
                        className={styles.showMoreButton}
                        variant="secondary-action"
                        onClick={() => setShowMore(Object.values<boolean>({ ...showMore, [index]: !showMore[index] }))}
                        icon={
                          <FontAwesomeIcon
                            className={clsx(styles.toggleIcon, showMore[index] && styles.isOpen)}
                            icon={faChevronRight}
                          />
                        }
                      >
                        {showMore[index] ? "show less" : "show more"}
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

      <Button icon={<ArrowRightIcon />} iconAlign="start" onClick={() => navigate("/categories")}>
        Bekijk alle categorieën
      </Button>
    </>
  );
};
