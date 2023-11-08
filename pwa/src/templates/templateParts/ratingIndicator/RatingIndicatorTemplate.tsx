import * as React from "react";
import * as styles from "./RatingIndicatorTemplate.module.css";
import { PieChart } from "react-minimal-pie-chart";
import { getTokenValue } from "../../../services/getTokenValue";
import clsx from "clsx";

interface RatingIndicatorTemplateProps {
  maxRating: number;
  rating: number;
  layoutClassName?: string;
}

export const RatingIndicatorTemplate: React.FC<RatingIndicatorTemplateProps> = ({
  maxRating,
  rating,
  layoutClassName,
}) => {
  return (
    <div className={clsx(styles.container, [layoutClassName && layoutClassName])}>
      <PieChart
        className={styles.ratingPieChart}
        data={[
          { value: 1, key: 1, color: getTokenValue(styles.ratingBarActiveColor), title: `${rating}/${maxRating}` },
        ]}
        reveal={(rating / maxRating) * 100}
        lineWidth={20}
        background={getTokenValue(styles.ratingBarBackgroundColor)}
        startAngle={270}
        lengthAngle={360}
        rounded
        animate
        animationDuration={1750}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: getTokenValue(styles.ratingFontSize),
          fontFamily: getTokenValue(styles.ratingFontFamily),
          fill: getTokenValue(styles.ratingBarActiveColor),
        }}
        labelPosition={0}
      />
    </div>
  );
};
