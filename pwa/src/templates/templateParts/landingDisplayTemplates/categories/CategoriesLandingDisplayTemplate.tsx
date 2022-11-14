import * as React from "react";
import * as styles from "./CategoriesLandingDisplayTemplate.module.css";
import _ from "lodash";
import { Button, Heading2, LeadParagraph, Link } from "@gemeente-denhaag/components-react";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "../../../../components/categoryCard/CategoryCard";
import { navigate } from "gatsby";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { TEMPORARY_DOMAINS } from "../../../../data/domains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { TEMPORARY_PORTFOLIOS } from "../../../../data/portfolio";

interface CategoriesLandingDisplayTemplateProps {}

export const CategoriesLandingDisplayTemplate: React.FC<CategoriesLandingDisplayTemplateProps> = ({}) => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = React.useState(false);

  const domains = TEMPORARY_DOMAINS;
  const categories = TEMPORARY_PORTFOLIOS;

  return (
    <>
      <div className={styles.subHeading}>
        <Heading2 className={styles.title}>{t("Categories")}</Heading2>

        <LeadParagraph className={styles.description}>
          Voor onderstaande gemeentelijke producten en diensten zijn Common Ground oplossingen beschikbaar.
        </LeadParagraph>
      </div>

      <div className={styles.ComponentsGrid}>
        {domains.map((domain) => (
          <>
            {showMore && (
              <CategoryCard
                title={{ label: t(domain.title), href: `/categories#${domain.title}` }}
                description={
                  <div>
                    {categories
                      .filter((category) => category.domain === domain.title)
                      .map((_category) => (
                        <div>
                          <div onClick={() => navigate(`/categories/${_category.id}`)}>
                            <Link icon={<ArrowRightIcon />} iconAlign="start">
                              {_category.title}
                            </Link>
                          </div>
                        </div>
                      ))}

                    <button className="btn" onClick={() => setShowMore(!showMore)}>
                      {showMore ? "Show less" : "Show more"}
                    </button>
                  </div>
                }
                icon={<FontAwesomeIcon icon={faTags} />}
                domain={true}
              />
            )}

            {!showMore && (
              <CategoryCard
                title={{ label: t(domain.title), href: `/categories#${domain.title}` }}
                description={
                  <div>
                    {categories
                      .filter((category) => category.domain === domain.title)
                      .slice(0, 5)
                      .map((_category) => (
                        <div>
                          <div onClick={() => navigate(`/categories/${_category.id}`)}>
                            <Link icon={<ArrowRightIcon />} iconAlign="start">
                              {_category.title}
                            </Link>
                          </div>
                        </div>
                      ))}

                    <button className="btn" onClick={() => setShowMore(!showMore)}>
                      {showMore ? "Show less" : "Show more"}
                    </button>
                  </div>
                }
                icon={<FontAwesomeIcon icon={faTags} />}
                domain={true}
              />
            )}
          </>
        ))}
      </div>

      <Button icon={<ArrowRightIcon />} iconAlign="start" onClick={() => navigate("/categories")}>
        Bekijk alle categorieën
      </Button>
    </>
  );
};
