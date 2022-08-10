import * as React from "react";
import { PieChart } from "react-minimal-pie-chart";

interface RatingIndicatorTemplateProps {
  component: any;
}

export const RatingIndicatorTemplate: React.FC<RatingIndicatorTemplateProps> = ({ component }) => {
  const [rating, setRating] = React.useState<number>(0);
  const highestPossibleRating = 2;

  React.useEffect(() => {
    let _rating = 0;

    if (component.legal?.license) {
      _rating += 1;
    }

    if (component.maintenance?.contractors) {
      _rating += 1;
    }

    setRating(_rating);
  });

  const calculatePercentage = (rating: number, highestPossibleRating: number) => {
    const percentage = (100 * rating) / highestPossibleRating;
    return percentage;
  };

  const ratingColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--web-app-color-background-page-header",
  );
  const ratingFont = getComputedStyle(document.documentElement).getPropertyValue("--web-app-primary-font-family");

  return (
    <PieChart
      data={[{ value: 1, key: 1, color: ratingColor, title: `${rating}/${highestPossibleRating}` }]}
      reveal={calculatePercentage(rating, highestPossibleRating)}
      lineWidth={20}
      background="#bfbfbf"
      startAngle={270}
      lengthAngle={360}
      rounded
      animate
      animationDuration={1750}
      label={({ dataEntry }) => dataEntry.title}
      labelStyle={{
        fontSize: "25px",
        fontFamily: ratingFont,
        fill: ratingColor,
      }}
      labelPosition={0}
    />
  );
};
