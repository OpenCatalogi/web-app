import * as React from "react";
import * as styles from "./pagination.module.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface PaginatedItemsProps {
  pages: number;
  currentPage: number;
  setPage: (page: number) => any;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  containerClassName: string;
  pageClassName: string;
  previousClassName: string;
  nextClassName: string;
  activeClassName: string;
  disabledClassName: string;
  breakClassName: string;
}

export const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  pages,
  currentPage,
  setPage,
  pageRangeDisplayed,
  marginPagesDisplayed,
  containerClassName,
  pageClassName,
  previousClassName,
  nextClassName,
  activeClassName,
  disabledClassName,
  breakClassName,
}) => {
  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      containerClassName={containerClassName}
      pageCount={pages}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      pageClassName={pageClassName}
      previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
      previousClassName={previousClassName}
      nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
      nextClassName={nextClassName}
      activeClassName={activeClassName}
      disableInitialCallback={true}
      disabledClassName={disabledClassName}
      breakLabel="..."
      breakClassName={breakClassName}
    />
  );
};
