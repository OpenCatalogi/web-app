import * as React from "react";
import * as styles from "./RatingIndicatorTemplate.module.css";
import { PieChart } from "react-minimal-pie-chart";
import Link from "@gemeente-denhaag/link";
import { navigate } from "gatsby";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { getTokenValue } from "../../../services/getTokenValue";

interface RatingIndicatorTemplateProps {
  component: any;
}

export const RatingIndicatorTemplate: React.FC<RatingIndicatorTemplateProps> = ({ component }) => {
  const [rating, setRating] = React.useState<number>(0);
  const maximumRating = 2;

  React.useEffect(() => {
    let _rating = 1;

    if (component.legal?.license) {
      _rating += 1;
    }

    if (component.maintenance?.contractors) {
      _rating += 1;
    }

    setRating(_rating);
  });

  return (
    <>
      <PieChart className={styles.ratingPieChart}
        data={[
          { value: 1, key: 1, color: getTokenValue(styles.ratingActiveColor), title: `${rating}/${maximumRating}` },
        ]}
        reveal={(rating / maximumRating) * 100}
        lineWidth={20}
        background={getTokenValue(styles.ratingDisabledColor)}
        startAngle={270}
        lengthAngle={360}
        rounded
        animate
        animationDuration={1750}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: getTokenValue(styles.ratingFontSize),
          fontFamily: getTokenValue(styles.ratingFontFamily),
          fill: getTokenValue(styles.ratingActiveColor),
        }}
        labelPosition={0}
      />
      <span
        onClick={() => {
          navigate("/about");
        }}
        className={styles.link}
      >
        <Link icon={<ArrowRightIcon />} iconAlign="start">
          Rating
        </Link>
      </span>
    </>
  );
};
