import * as React from "react";
import * as styles from "./TableWrapper.module.css";
import _ from "lodash";
import clsx from "clsx";

const TableWrapper: React.FC = ({ children }) => {
  const [tableIsScrollable, setTableIsScrollable] = React.useState<Boolean>(false);
  const [tableScrollPosition, setTableScrollPosition] = React.useState<"left" | "middle" | "right">("left");
  const TableScrollWrapper = React.useRef();

  const isTableScrollable = () => TableScrollWrapper?.current?.scrollWidth > TableScrollWrapper?.current?.clientWidth;

  React.useEffect(() => {
    TableScrollWrapper.current && setTableIsScrollable(isTableScrollable());
  }, [TableScrollWrapper]);

  React.useEffect(() => {
    const handleWindowResize = _.debounce(() => {
      setTableIsScrollable(isTableScrollable());
      setScrollPosition();
    }, 80);

    window.addEventListener("resize", handleWindowResize);

    () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const setScrollPosition = () => {
    const maxScrollLeft = TableScrollWrapper?.current?.scrollWidth - TableScrollWrapper?.current?.clientWidth;

    if (TableScrollWrapper?.current?.scrollLeft === 0) setTableScrollPosition("left");
    else if (TableScrollWrapper?.current?.scrollLeft === maxScrollLeft) setTableScrollPosition("right");
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
      <div className={styles.table} ref={TableScrollWrapper} onScroll={setScrollPosition}>
        {children}
      </div>
    </div>
  );
};

export default TableWrapper;
