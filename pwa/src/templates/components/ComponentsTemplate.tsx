import * as React from "react";
import * as styles from "./ComponentsTemplate.module.css";
import * as _ from "lodash";
import { Alert, Heading2 } from "@gemeente-denhaag/components-react";
import { Container } from "@conduction/components";
import { ComponentResultTemplate } from "../templateParts/resultsTemplates/ComponentResultsTemplate";
import { FiltersContext } from "../../context/filters";
import { useTranslation } from "react-i18next";
import { QueryClient } from "react-query";
import { VerticalFiltersTemplate } from "../templateParts/filters/verticalFilters/VerticalFiltersTemplate";
import Skeleton from "react-loading-skeleton";
import { HorizontalFiltersTemplate } from "../templateParts/filters/horizontalFilters/HorizontalFiltersTemplate";
import { SubmitComponentTemplate } from "../templateParts/submitComponent/SubmitComponentTemplate";
import { GatsbyContext } from "../../context/gatsby";
import { PaginatedItems } from "../../components/pagination/pagination";
import { useSearch } from "../../hooks/search";
import { ActiveFiltersTemplate } from "../templateParts/filters/activeFilters/ActiveFiltersTemplate";
import ResultsDisplaySwitch from "../../components/resultsDisplaySwitch/ResultsDisplaySwitch";

export const ComponentsTemplate: React.FC = () => {
	const [filters, setFilters] = React.useContext(FiltersContext);
	const { t } = useTranslation();
	const { screenSize } = React.useContext(GatsbyContext);
	const [marginPagesDisplayed, setMarginPageDisplayed] = React.useState<number>(3);

	const queryClient = new QueryClient();
	const _useSearch = useSearch(queryClient);
	const getComponents = _useSearch.getSearch({ ...filters, resultDisplayLayout: "table" }); // Ensure no refetch on resultDisplayLayout change

	React.useEffect(() => {
		if (getComponents.isSuccess && screenSize === "mobile") {
			setMarginPageDisplayed(2);
		}
		if (getComponents.isSuccess && screenSize === "mobile" && getComponents.data.pages > 100) {
			setMarginPageDisplayed(1);
		}
		if (getComponents.isSuccess && screenSize !== "mobile") {
			setMarginPageDisplayed(3);
		}
	}, [getComponents]);

	return (
		<Container layoutClassName={styles.container}>
			<div className={styles.header}>
				<div>
					<Heading2 className={styles.title}>Componenten</Heading2>
				</div>

				<ResultsDisplaySwitch resultsDisplayType="resultDisplayLayout" />
			</div>

			<div className={styles.filtersAndResultsContainer}>
				<VerticalFiltersTemplate filterSet={[filters]} layoutClassName={styles.verticalFilters} />

				<div className={styles.results}>
					<HorizontalFiltersTemplate />
					{filters.resultDisplayLayout === "table" && (
						<Alert title="Op deze pagina worden alle resultaten weergegeven" text="" variant="info" />
					)}

					{filters.resultDisplayLayout === "cards" && (
						<Alert
							title="Op deze pagina staan alleen applicaties, organisaties en componenten"
							text=""
							variant="info"
						/>
					)}
					{filters.resultDisplayLayout === "layer" && (
						<Alert title="Op deze pagina staan alleen componenten met een laag" text="" variant="info" />
					)}

					<ActiveFiltersTemplate />

					{getComponents.data?.results?.length === 0 && !getComponents.isLoading && (
						<span>{t("No components found with active filters")}</span>
					)}

					{getComponents.data?.results && getComponents.data?.results?.length > 0 && (
						<>
							<ComponentResultTemplate components={getComponents.data.results} type={filters.resultDisplayLayout} />

							<SubmitComponentTemplate />
							{getComponents.data.results.length && (
								<PaginatedItems
									pages={getComponents.data.pages}
									currentPage={getComponents.data.page}
									setPage={(page) => setFilters({ ...filters, currentPage: page })}
									pageRangeDisplayed={2}
									marginPagesDisplayed={marginPagesDisplayed}
									containerClassName={styles.paginationContainer}
									pageClassName={getComponents.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
									previousClassName={
										getComponents.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink
									}
									nextClassName={getComponents.data.pages > 1000 ? styles.paginationLinkSmall : styles.paginationLink}
									activeClassName={
										getComponents.data.pages > 1000 ? styles.paginationActivePageSmall : styles.paginationActivePage
									}
									disabledClassName={styles.paginationDisabled}
									breakClassName={styles.breakLink}
								/>
							)}
						</>
					)}
					{getComponents.isLoading && <Skeleton height="200px" />}
				</div>
			</div>
		</Container>
	);
};
