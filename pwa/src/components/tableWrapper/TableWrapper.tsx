import * as React from "react";
import * as styles from "./TableWrapper.module.css";
import _ from "lodash";
import clsx from "clsx";

const TableWrapper: React.FC = ({ children }) => {
  const [tableIsScrollable, setTableIsScrollable] = React.useState<Boolean>(false);
  const [tableScrollPosition, setTableScrollPosition] = React.useState<"left" | "middle" | "right">("left");

  const tableWrapperRef = React.useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;

  const isTableScrollable = () => {
    if (!tableWrapperRef.current) return false;

    return tableWrapperRef.current.scrollWidth > tableWrapperRef.current.clientWidth;
  };

  React.useEffect(() => {
    tableWrapperRef.current && setTableIsScrollable(isTableScrollable());
  }, [tableWrapperRef]);

  React.useEffect(() => {
    if (!tableWrapperRef.current) return;

    const handleWindowResize = _.debounce(() => {
      setTableIsScrollable(isTableScrollable());
      setScrollPosition();
    }, 80);

    window.addEventListener("resize", handleWindowResize);

    () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const setScrollPosition = () => {
    const maxScrollLeft = tableWrapperRef?.current?.scrollWidth - tableWrapperRef?.current?.clientWidth;

    if (tableWrapperRef?.current?.scrollLeft === 0) setTableScrollPosition("left");
    else if (tableWrapperRef?.current?.scrollLeft === maxScrollLeft) setTableScrollPosition("right");
    else setTableScrollPosition("middle");
  };

  return (
    <div
      className={clsx(
        tableIsScrollable && [
          styles.tableBoxShadow,
          tableScrollPosition === "left" && styles.tableBoxShadowR,
          tableScrollPosition === "right" && styles.tableBoxShadowL,
          tableScrollPosition === "middle" && styles.tableBoxShadowM,
        ],
      )}
    >
      {/* @ts-ignore */}
      <div className={styles.table} ref={tableWrapperRef} onScroll={setScrollPosition}>
        {children}
      </div>
    </div>
  );
};

export default TableWrapper;
