import * as React from "react";
import * as styles from "./Breadcrumbs.module.css";
import _ from "lodash";
import { Container } from "@conduction/components";
import { isHomepage } from "../../services/isHomepage";
import { BreadcrumbNav, BreadcrumbNavLink, BreadcrumbNavSeparator, Icon } from "@utrecht/component-library-react";
import { useGatsbyContext } from "../../context/gatsby";
import { navigate } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const Breadcrumbs: React.FC = () => {
  const { t } = useTranslation();

  const {
    pageContext: {
      breadcrumb: { crumbs },
    },
    location: { pathname },
  } = useGatsbyContext();

  const translatedCrumbs = crumbs.map((crumb: any) => ({ ...crumb, crumbLabel: t(_.upperFirst(crumb.crumbLabel)) }));

  const handleBreadcrumbClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, pathname: string) => {
    e.preventDefault();

    navigate(pathname);
  };

  if (!isHomepage(pathname))
    return (
      <Container layoutClassName={styles.breadcrumbsContainer}>
        <BreadcrumbNav className={styles.breadcrumbs} label={t("Breadcrumbs")}>
          {translatedCrumbs.map((crumb: any, idx: number) => {
            if (crumbs.length !== idx + 1) {
              return (
                <React.Fragment key={idx}>
                  <BreadcrumbNavLink
                    className={styles.breadcrumbNavLink}
                    onClick={(e: any) => handleBreadcrumbClick(e, crumb.pathname)}
                    href=""
                  >
                    {crumb.crumbLabel}
                  </BreadcrumbNavLink>

                  <BreadcrumbNavSeparator>
                    <Icon>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </Icon>
                  </BreadcrumbNavSeparator>
                </React.Fragment>
              );
            }
            return (
              <BreadcrumbNavLink key={idx} className={styles.breadcrumbDisabled} current disabled href="">
                {crumb.crumbLabel}
              </BreadcrumbNavLink>
            );
          })}
        </BreadcrumbNav>
      </Container>
    );

  return <></>;
};
