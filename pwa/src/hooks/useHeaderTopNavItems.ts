import * as React from "react";
import { ITopNavItem } from "@conduction/components/lib/components/topNav/primaryTopNav/PrimaryTopNav";
import { useGatsbyContext } from "../context/gatsby";
import { IFiltersContext, defaultFiltersContext, useFiltersContext } from "../context/filters";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";

export const useHeaderTopNavItems = (data: any) => {
  const {
    location: { pathname },
  } = useGatsbyContext();
  const { t } = useTranslation();
  const { filters, setFilters } = useFiltersContext();

  const headerTopNavItems: ITopNavItem[] = [];

  data?.map((item: any) => {
    const isCurrent = (current: any) => {
      const prefixedPathname =
        process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true"
          ? `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}${current.pathname}`
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

        console.log(current.filterCondition.filter);
        const currentFilter = filters[current.filterCondition.filter as keyof IFiltersContext];

        if (typeof currentFilter === "object") {
          return currentFilter?.toString().includes(current.filterCondition.value);
        }

        if (typeof currentFilter === "string") {
          console.log("currentFilterName", currentFilter);
          console.log("currentFilterType", typeof currentFilter);
          console.log("valuerName", current.filterCondition?.value);
          console.log("valuerNameType",typeof current.filterCondition?.value);
          console.log(currentFilter == current.filterConditon?.value);
          return currentFilter === current.filterConditon?.value;
        }
      }
    };

    const getOnClick = (onClick: any, type: "readme" | "internal" | "external", label: string) => {
      if (!onClick || !type || !label) return;

      if (onClick.link && !onClick.setFilter) {
        if (type === "internal") {
          navigate(onClick.link);
        }
        if (type === "external") {
          open(onClick.link);
        }
        if (type === "readme") {
          navigate(`/github/${label.replaceAll(" ", "_")}/?link=${onClick.link}`);
        }
      }
      if (onClick.link && onClick.setFilter && type === "internal") {
        onClick.setFilter?.isObject === true
          ? setFilters({ ...defaultFiltersContext, [onClick.setFilter!.filter]: [onClick.setFilter!.value] })
          : setFilters({ ...defaultFiltersContext, [onClick.setFilter!.filter]: onClick.setFilter!.value });
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
          current: isCurrent(item.current),
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
