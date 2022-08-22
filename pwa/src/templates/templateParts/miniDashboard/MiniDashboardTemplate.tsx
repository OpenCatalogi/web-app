import * as React from "react";
import * as styles from "./MiniDashboardTemplate.module.css";
import { Link } from "@gemeente-denhaag/components-react";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import { QueryClient } from "react-query";
import { filters, FiltersContext } from "../../../context/filters";
import { useComponent } from "../../../hooks/components";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { navigate } from "gatsby";

interface MiniDashboardTemplateProps {
  layoutClassName?: string;
}

export const MiniDashboardTemplate: React.FC<MiniDashboardTemplateProps> = ({ layoutClassName }) => {
  const _useComponent = useComponent(new QueryClient());

  const _getSoftwareCount = _useComponent.getCount({ ...filters, softwareType: "standalone/desktop" });
  const _getDataModelsCount = _useComponent.getCount({ ...filters, softwareType: "schema" });
  const _getApiCount = _useComponent.getCount({ ...filters, softwareType: "api" });

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
    <div
      className={styles.cardContainer}
      onClick={() => {
        setFilters({ ...filters, softwareType: softwareType });
        navigate("/components");
      }}
    >
      {count && <div className={styles.cardCount}>{count}</div>}
      {!count && <Skeleton className={styles.cardCount} />}

      <div className={styles.cardLinkContainer}>
        <Link icon={<ArrowRightIcon />} iconAlign="start">
          {label}
        </Link>
      </div>
    </div>
  );
};
