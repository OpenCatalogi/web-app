import * as React from "react";
import * as styles from "./pagination.module.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { GatsbyContext } from "../../context/gatsby";

interface PaginatedItemsProps {
  pages: number;
  currentPage: number;
  setPage: (page: number) => any;
  pageRangeDisplayed: number;
  containerClassName: string;
}

export const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  pages,
  currentPage,
  setPage,
  pageRangeDisplayed,
  containerClassName,
}) => {
  const { screenSize } = React.useContext(GatsbyContext);

  const [marginPagesDisplayed, setMarginPageDisplayed] = React.useState<number>(3);

  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };

  React.useEffect(() => {
    if (screenSize === "mobile") {
      setMarginPageDisplayed(2);
    }
    if (screenSize === "mobile" && pages > 100) {
      setMarginPageDisplayed(1);
    }
    if (screenSize !== "mobile") {
      setMarginPageDisplayed(3);
    }
  });

  return (
    <ReactPaginate
      containerClassName={containerClassName}
      pageCount={pages}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      pageClassName={pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
      previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
      previousClassName={pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
      nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
      nextClassName={pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
      activeClassName={pages > 1000 ? styles.paginationActivePageSmall : styles.paginationActivePage}
      disableInitialCallback={true}
      disabledClassName={styles.paginationDisabled}
      breakLabel="..."
      breakClassName={styles.breakLink}
    />
  );
};
