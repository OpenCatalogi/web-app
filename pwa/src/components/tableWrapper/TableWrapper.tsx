import React, { useState, useEffect } from "react";
import * as styles from "./TableWrapper.module.css";
import { Button } from "@utrecht/component-library-react";

export const TableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (wrapperRef.current) {
      setCanScrollLeft(wrapperRef.current.scrollLeft > 0);
      setCanScrollRight(
        wrapperRef.current.scrollWidth - wrapperRef.current.scrollLeft > wrapperRef.current.clientWidth,
      );
    }
  };

  const handleScrollRight = () => {
    if (wrapperRef.current) wrapperRef.current.scrollTo({ left: wrapperRef.current.scrollWidth, behavior: "smooth" });
  };

  const handleScrollLeft = () => {
    if (wrapperRef.current) wrapperRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (wrapperRef.current) {
      setCanScrollRight(wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth); // initiate scroll
    }
  }, []);

  return (
    <div className={styles.container}>
      <div onScroll={handleScroll} ref={wrapperRef} className={styles.wrapper}>
        {children}
      </div>

      {canScrollLeft && (
        <div onClick={handleScrollLeft} className={styles.scrollLeftButton}>
          <Button>Left</Button>
        </div>
      )}
      {canScrollRight && (
        <div onClick={handleScrollRight} className={styles.scrollRightButton}>
          <Button>Right</Button>
        </div>
      )}
    </div>
  );
};
