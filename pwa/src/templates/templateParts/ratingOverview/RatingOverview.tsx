import * as React from "react";
import * as styles from "./RatingOverview.module.css";
import { QueryObserverSuccessResult } from "react-query";
import { t } from "i18next";
import { UnorderedList, UnorderedListItem } from "@utrecht/component-library-react/dist/css-module";

interface RatingOverviewProps {
  getComponent: QueryObserverSuccessResult<any, Error>;
}

export const RatingOverview: React.FC<RatingOverviewProps> = ({ getComponent }) => {
  return (
    <>
      {getComponent.data.embedded?.rating?.rating && (
        <span>{`${getComponent.data.embedded?.rating?.rating}/${getComponent.data.embedded?.rating?.maxRating}`}</span>
      )}
      {!getComponent.data.embedded?.rating?.rating && <span>{t("No rating available")}</span>}

      <div className={styles.popupDescription}>
        <UnorderedList>
          {getComponent.data.embedded?.rating?.rating >= 1 && (
            <>
              <li>Behaalde punten</li>

              {getComponent.data.embedded?.rating?.results
                .filter((result: string) => !/^Cannot rate the/.test(result))
                .map((result: string) => (
                  <ul>
                    {" "}
                    <li>{result}</li>
                  </ul>
                ))}
            </>
          )}
          {getComponent.data.embedded?.rating?.rating !== getComponent.data.embedded?.rating?.maxRating && (
            <>
              <li>Onbehaalde punten</li>

              {getComponent.data.embedded?.rating?.results
                .filter((result: string) => /^Cannot rate the/.test(result))
                .map((result: string) => (
                  <ul>
                    <li className={styles.customTable}>{result}</li>
                  </ul>
                ))}
            </>
          )}
        </UnorderedList>
      </div>
    </>
  );
};
