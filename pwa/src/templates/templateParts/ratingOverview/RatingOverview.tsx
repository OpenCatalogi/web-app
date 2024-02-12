import * as React from "react";
import * as styles from "./RatingOverview.module.css";
import {
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@utrecht/component-library-react";
import { useTranslation } from "react-i18next";
import { HorizontalOverflowWrapper } from "@conduction/components";

interface RatingOverviewProps {
  rating: any;
}

export const RatingOverview: React.FC<RatingOverviewProps> = ({ rating }) => {
  const { t } = useTranslation();

  const [acceptedRatings, setAcceptedRatings] = React.useState<string[]>([]);
  const [rejectedRatings, setRejectedRatings] = React.useState<string[]>([]);

  React.useEffect(() => {
    setAcceptedRatings(rating.results.filter((rating: string) => !rating.includes("Cannot rate the")));
    setRejectedRatings(rating.results.filter((rating: string) => rating.includes("Cannot rate the")));
  }, [rating]);

  return (
    <HorizontalOverflowWrapper
      ariaLabels={{ scrollLeftButton: t("Left scroll button"), scrollRightButton: t("Right scroll button") }}
    >
      <Table className={styles.container}>
        <TableHeader className={styles.tableHeader}>
          <TableRow>
            <TableHeaderCell>{t("Status")}</TableHeaderCell>
            <TableHeaderCell>{t("Description")}</TableHeaderCell>
            <TableHeaderCell>{t("Points")}</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody className={styles.tableBody}>
          {acceptedRatings.map((acceptedRating, idx) => (
            <TableRow className={styles.tableRow} key={idx}>
              <TableCell>
                <StatusBadge status="safe" className={styles.statusBadge}>
                  Passed
                </StatusBadge>
              </TableCell>
              <TableCell>{acceptedRating}</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          ))}

          {rejectedRatings.map((rejectedRating, idx) => (
            <TableRow className={styles.tableRow} key={idx}>
              <TableCell>
                <StatusBadge status="danger" className={styles.statusBadge}>
                  Failed
                </StatusBadge>
              </TableCell>
              <TableCell>{rejectedRating}</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </HorizontalOverflowWrapper>
  );
};
