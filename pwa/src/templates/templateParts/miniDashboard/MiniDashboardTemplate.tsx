/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import * as React from "react";
import * as styles from "./MiniDashboardTemplate.module.css";
import { Icon, Link } from "@utrecht/component-library-react/dist/css-module";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import { QueryClient } from "react-query";
import { baseFilters, FiltersContext } from "../../../context/filters";
import { useComponent } from "../../../hooks/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { Link as GatsbyLink } from "gatsby";

interface MiniDashboardTemplateProps {
  layoutClassName?: string;
}

export const MiniDashboardTemplate: React.FC<MiniDashboardTemplateProps> = ({ layoutClassName }) => {
  const _useComponent = useComponent(new QueryClient());

  const _getSoftwareCount = _useComponent.getCount({ ...baseFilters, softwareType: "standalone/desktop" });
  const _getDataModelsCount = _useComponent.getCount({ ...baseFilters, softwareType: "schema" });
  const _getApiCount = _useComponent.getCount({ ...baseFilters, softwareType: "api" });

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <MiniDashboardCard label="Software" softwareType="standalone/desktop" count={_getSoftwareCount.data} />
      <MiniDashboardCard label="Datamodellen" softwareType="schema" count={_getDataModelsCount.data} />
      <MiniDashboardCard label="API's" softwareType="api" count={_getApiCount.data} />
    </div>
  );
};

// Mini dashboard card
interface MiniDashboardCardProps {
  label: string;
  softwareType: string;
  count?: number;
}

const MiniDashboardCard: React.FC<MiniDashboardCardProps> = ({ label, softwareType, count }) => {
  const [_, setFilters] = React.useContext(FiltersContext);

  return (
    <div className={styles.cardContainer}>
      {count && <div className={styles.cardCount}>{count}</div>}
      {!count && <Skeleton className={styles.cardCount} />}

      <div className={styles.cardLinkContainer}>
        <GatsbyLink
          to="/components"
          onClick={() => {
            setFilters({ ...baseFilters, softwareType: softwareType });
          }}
        >
          <Link>
            <Icon className="utrecht-icon--conduction-start">
              <ArrowRightIcon />
            </Icon>{" "}
            {label}
          </Link>
        </GatsbyLink>
      </div>
    </div>
  );
};
