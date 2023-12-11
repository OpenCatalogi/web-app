import { ITopNavItem } from "@conduction/components/lib/components/topNav/primaryTopNav/PrimaryTopNav";
import { useGatsbyContext } from "../context/gatsby";
import { IFiltersContext, defaultFiltersContext, useFiltersContext } from "../context/filters";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";

type THeaderTopNavItem = {
  label: string;
  type: "markdown" | "internal" | "external";
  current: {
    pathname: string;
    filterCondition?: {
      filterKey: string;
      value: string;
    };
  };
  handleClick?: {
    link: string;
    setFilter?: {
      filterKey: string;
      value: string;
    };
  };
};

export const useHeaderTopNavItems = (data: THeaderTopNavItem[]) => {
  const {
    location: { pathname },
  } = useGatsbyContext();
  const { t } = useTranslation();
  const { filters, setFilters } = useFiltersContext();

  const headerTopNavItems: ITopNavItem[] = [];

  data?.map((item: any) => {
    const isCurrent = (current: any) => {
      const prefixedPathname =
        window.sessionStorage.getItem("USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX") === "true"
          ? `/${window.sessionStorage.getItem("GITHUB_REPOSITORY_NAME")}${current.pathname}`
          : current.pathname;

      const isCurrentRoute = (): boolean => {
        if (prefixedPathname === pathname) return true;

        if (current.pathname !== "/") return pathname.includes(current.pathname);

        return false;
      };

      if (!current.filterCondition) {
        return isCurrentRoute();
      }

      if (current.filterCondition) {
        if (!isCurrentRoute()) return false;

        const currentFilter = filters[current.filterCondition.filterKey as keyof IFiltersContext];

        if (typeof currentFilter === "object") {
          return currentFilter?.toString().includes(current.filterCondition.value);
        }

        if (typeof currentFilter === "string") {
          return currentFilter === current.filterCondition?.value;
        }
      }
    };

    const getOnClick = (onClick: any, type: "markdown" | "readme" | "internal" | "external", label: string) => {
      if (!onClick || !type || !label) return;

      if (onClick.link && !onClick.setFilter) {
        if (type === "internal") {
          navigate(onClick.link);
        }

        if (type === "external") {
          open(onClick.link);
        }

        if (type === "markdown" || type === "readme") {
          navigate(`/github/${label.replaceAll(" ", "_")}/?link=${onClick.link}`);
        }
      }

      if (onClick.link && onClick.setFilter && type === "internal") {
        const onClickFilter = filters[onClick.setFilter!.filterKey as keyof IFiltersContext];

        if (typeof onClickFilter === "object") {
          setFilters({ ...defaultFiltersContext, [onClick.setFilter!.filterKey]: [onClick.setFilter!.value] });
        }

        if (typeof onClickFilter === "string") {
          setFilters({ ...defaultFiltersContext, [onClick.setFilter!.filterKey]: onClick.setFilter!.value });
        }

        navigate(onClick.link);
      }
    };

    const setSubItems = (subItems: ITopNavItem[]) => {
      if (!subItems) return;
      const subItemsArray: ITopNavItem[] = [];

      subItems.map((item: any) => {
        subItemsArray.push({
          label: t(item.label),
          type: item.type,
          current: item.current ? isCurrent(item.current) : false,
          handleClick: () => getOnClick(item.handleClick, item.type, item.label),
        });
      });

      const subItemsObject = Object.assign(subItemsArray);

      return subItemsObject;
    };

    headerTopNavItems.push({
      label: t(item.label),
      type: item.type,
      current: item.current ? isCurrent(item.current) : false,
      handleClick: () => getOnClick(item.handleClick, item.type, item.label),
      subItems: setSubItems(item.subItems),
    });
  });

  return { headerTopNavItems };
};
