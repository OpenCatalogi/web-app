import * as React from "react";
import * as styles from "./Pagination.module.css";
import clsx from "clsx";

import ReactPaginate from "react-paginate";
import { Button } from "@utrecht/component-library-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  layoutClassName?: string;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
  layoutClassName,
  pageRangeDisplayed,
  marginPagesDisplayed,
}) => {
  if (totalPages < 1) return <></>; // no pages available

  return (
    <ReactPaginate
      className={clsx(styles.container, layoutClassName && layoutClassName)}
      pageCount={totalPages}
      onPageChange={(e: any) => setCurrentPage(e.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={pageRangeDisplayed ?? 3}
      marginPagesDisplayed={2}
      previousLabel={
        <div className={styles.button}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      }
      previousClassName={styles.previous}
      nextLabel={
        <div className={styles.button}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      }
      nextClassName={styles.next}
      activeClassName={styles.currentPage}
      disableInitialCallback
      disabledClassName={styles.disabled}
      breakLabel="..."
    />
  );
};
