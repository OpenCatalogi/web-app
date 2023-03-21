import * as React from "react";
import * as styles from "./ActiveFiltersTemplate.module.css";
import { FiltersContext } from "../../../../context/filters";
import _ from "lodash";
import {
	maintenanceTypes,
	softwareTypes,
	licenses,
	statuses,
	applicatiefuncties,
	referentieComponenten,
	categories,
} from "../../../../data/filters";
import { Heading4 } from "@gemeente-denhaag/components-react";
import { Tag } from "@conduction/components";
import { useTranslation } from "react-i18next";

export const ActiveFiltersTemplate: React.FC = () => {
	const [filters, setFilters] = React.useContext(FiltersContext);
	const { t } = useTranslation();

	const category = categories.find((category) => {
		return category.value === filters?.category;
	});

	const status = statuses.find((status) => {
		return status.value === filters?.developmentStatus;
	});

	const maintenanceType = maintenanceTypes.find((maintenanceType) => {
		return maintenanceType.value === filters["embedded.maintenance.type"];
	});

	const softwareType = softwareTypes.find((softwareType) => {
		return softwareType.value === filters.softwareType;
	});

	const licence = licenses.find((licence) => {
		return licence.value === filters["embedded.legal.license"];
	});

	const applicatiefunctie = applicatiefuncties.find((applicatiefunctie) => {
		return applicatiefunctie.value === filters["embedded.nl.embedded.gemma.applicatiefunctie"];
	});

	const _referentieComponenten = filters["embedded.nl.embedded.gemma.referentieComponenten"]?.map((filter) => {
		return referentieComponenten.find((referentieComponent) => {
			return referentieComponent.value === filter;
		});
	});

	const clearFilters = () => {
		setFilters({
			...filters,
			_search: "",
			softwareType: "",
			developmentStatus: "",
			platforms: [],
			category: "",
			"embedded.nl.embedded.commonground.layerType": [],
			"embedded.nl.embedded.gemma.bedrijfsfuncties": [],
			"embedded.nl.embedded.gemma.bedrijfsservices": [],
			"embedded.nl.embedded.gemma.referentieComponenten": [],
			"embedded.nl.embedded.gemma.applicatiefunctie": "",
			"embedded.nl.embedded.upl": [],
			"embedded.maintenance.type": "",
			"embedded.legal.license": "",
			"embedded.legal.mainCopyrightOwner": "",
			"embedded.url.embedded.organisation.name": "",
		});
	};

	return (
		<div>
			<div className={styles.activeFiltersHeader}>
				<Heading4>Actieve Filters</Heading4>
				<Tag layoutClassName={styles.removeActiveFiltersButton} label="Alles wissen" onClick={clearFilters} />
			</div>
			<div className={styles.activeFilters}>
				{filters._search && (
					<Tag
						label={`${t("Search term")}: ${filters._search}`}
						remove={() => setFilters({ ...filters, _search: "" })}
					/>
				)}

				{filters["embedded.nl.embedded.commonground.layerType"]?.map((layer, idx) => (
					<Tag
						key={idx}
						label={t(_.upperFirst(layer))}
						remove={() =>
							setFilters({
								...filters,
								"embedded.nl.embedded.commonground.layerType":
                  filters["embedded.nl.embedded.commonground.layerType"] &&
                  filters["embedded.nl.embedded.commonground.layerType"].filter((e) => e !== layer),
							})
						}
					/>
				))}

				{filters["embedded.nl.embedded.upl"]?.map((layer, idx) => (
					<Tag
						key={idx}
						label={_.upperFirst(layer)}
						remove={() =>
							setFilters({
								...filters,
								"embedded.nl.embedded.upl":
                  filters["embedded.nl.embedded.upl"] && filters["embedded.nl.embedded.upl"].filter((e) => e !== layer),
							})
						}
					/>
				))}

				{filters["embedded.url.embedded.organisation.name"] && (
					<Tag
						label={filters["embedded.url.embedded.organisation.name"] ?? ""}
						remove={() => setFilters({ ...filters, "embedded.url.embedded.organisation.name": undefined })}
					/>
				)}

				{filters.category && (
					<Tag label={category?.label ?? ""} remove={() => setFilters({ ...filters, category: undefined })} />
				)}

				{filters.platforms?.map((layer, idx) => (
					<Tag
						key={idx}
						label={t(_.upperFirst(layer))}
						remove={() =>
							setFilters({
								...filters,
								platforms: filters.platforms && filters.platforms.filter((e) => e !== layer),
							})
						}
					/>
				))}

				{filters.developmentStatus && (
					<Tag label={status?.label ?? ""} remove={() => setFilters({ ...filters, developmentStatus: undefined })} />
				)}

				{filters["embedded.maintenance.type"] && (
					<Tag
						label={maintenanceType?.label ?? ""}
						remove={() => setFilters({ ...filters, "embedded.maintenance.type": undefined })}
					/>
				)}

				{filters.softwareType && (
					<Tag label={softwareType?.label ?? ""} remove={() => setFilters({ ...filters, softwareType: undefined })} />
				)}

				{filters["embedded.legal.license"] && (
					<Tag
						label={licence?.label ?? ""}
						remove={() => setFilters({ ...filters, "embedded.legal.license": undefined })}
					/>
				)}

				{filters["embedded.nl.embedded.gemma.bedrijfsfuncties"]?.map((layer, idx) => (
					<Tag
						key={idx}
						label={t(_.upperFirst(layer))}
						remove={() =>
							setFilters({
								...filters,
								"embedded.nl.embedded.gemma.bedrijfsfuncties":
                  filters["embedded.nl.embedded.gemma.bedrijfsfuncties"] &&
                  filters["embedded.nl.embedded.gemma.bedrijfsfuncties"].filter((e) => e !== layer),
							})
						}
					/>
				))}

				{filters["embedded.nl.embedded.gemma.bedrijfsservices"]?.map((layer, idx) => (
					<Tag
						key={idx}
						label={t(_.upperFirst(layer))}
						remove={() =>
							setFilters({
								...filters,
								"embedded.nl.embedded.gemma.bedrijfsservices":
                  filters["embedded.nl.embedded.gemma.bedrijfsservices"] &&
                  filters["embedded.nl.embedded.gemma.bedrijfsservices"].filter((e) => e !== layer),
							})
						}
					/>
				))}
				{_referentieComponenten?.map((layer, idx) => (
					<Tag
						key={idx}
						label={layer?.label ?? ""}
						remove={() =>
							setFilters({
								...filters,
								"embedded.nl.embedded.gemma.referentieComponenten":
                  filters["embedded.nl.embedded.gemma.referentieComponenten"] &&
                  filters["embedded.nl.embedded.gemma.referentieComponenten"].filter((e) => e !== layer?.value),
							})
						}
					/>
				))}

				{filters["embedded.nl.embedded.gemma.applicatiefunctie"] && (
					<Tag
						label={applicatiefunctie?.label ?? ""}
						remove={() => setFilters({ ...filters, "embedded.nl.embedded.gemma.applicatiefunctie": "" })}
					/>
				)}
			</div>
		</div>
	);
};
