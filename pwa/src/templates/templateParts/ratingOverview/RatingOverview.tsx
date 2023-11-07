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

interface RatingOverviewProps {
  rating: any;
}

export const RatingOverview: React.FC<RatingOverviewProps> = ({ rating }) => {
  const [acceptedRatings, setAcceptedRatings] = React.useState<string[]>([]);
  const [rejectedRatings, setRejectedRatings] = React.useState<string[]>([]);

  React.useEffect(() => {
    setAcceptedRatings(rating.results.filter((rating: string) => !rating.includes("Cannot rate the")));
    setRejectedRatings(rating.results.filter((rating: string) => rating.includes("Cannot rate the")));
  }, [rating]);

  return (
    <Table className={styles.container}>
      <TableHeader className={styles.header}>
        <TableRow>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Message</TableHeaderCell>
          <TableHeaderCell>Points</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {acceptedRatings.map((acceptedRating, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <StatusBadge status="safe">Passed</StatusBadge>
            </TableCell>
            <TableCell>{acceptedRating}</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        ))}

        {rejectedRatings.map((rejectedRating, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <StatusBadge status="danger">Failed</StatusBadge>
            </TableCell>
            <TableCell>{rejectedRating}</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
