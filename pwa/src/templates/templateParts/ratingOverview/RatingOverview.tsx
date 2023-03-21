import * as React from "react";
import * as styles from "./RatingOverview.module.css";
import { QueryObserverSuccessResult } from "react-query";
import { t } from "i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@gemeente-denhaag/table";

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
				<Table>
					<TableBody>
						{getComponent.data.embedded?.rating?.rating >= 1 && (
							<>
								<TableRow>
									<TableHeader>Behaalde punten</TableHeader>
								</TableRow>
								{getComponent.data.embedded?.rating?.results
									.filter((result: string) => !/^Cannot rate the/.test(result))
									.map((result: string) => (
										<TableRow>
											<TableCell>{result}</TableCell>
										</TableRow>
									))}
							</>
						)}
						{getComponent.data.embedded?.rating?.rating !== getComponent.data.embedded?.rating?.maxRating && (
							<>
								<TableRow>
									<TableHeader>Onbehaalde punten</TableHeader>
								</TableRow>
								{getComponent.data.embedded?.rating?.results
									.filter((result: string) => /^Cannot rate the/.test(result))
									.map((result: string) => (
										<TableRow>
											<TableCell>{result}</TableCell>
										</TableRow>
									))}
							</>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
