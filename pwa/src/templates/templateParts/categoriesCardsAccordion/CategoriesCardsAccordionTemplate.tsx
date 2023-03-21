import * as React from "react";
import * as styles from "./CategoriesCardsAccordionTemplate.module.css";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { CategoriesAccordion } from "../categoriesAccordion/CategoriesAccordionTemplate";
import { CategoriesAccordionFiltersTemplate } from "../categoriesAccordion/filters/CategoriesAccordionFiltersTemplate";
import { CategoriesCardsAccordionHeaderTemplate } from "./header/CategoriesCardsAccordionHeaderTemplate";
import { CategoryCard } from "../../../components/categoryCard/CategoryCard";

interface CategoriesardsAccordionProps {
  categories: any[];
}

export const CategoriesardsAccordionTemplate: React.FC<CategoriesardsAccordionProps> = ({ categories }) => {
	const Accordion = CategoriesAccordion.accordion;
	const AccordionCardsController = CategoriesAccordion.controller;
	const { t } = useTranslation();

	const controlRef: any = React.useRef();
	const developmentRef: any = React.useRef();
	const surveillanceRef: any = React.useRef();
	const directingRef: any = React.useRef();
	const customerAndChainInteractionRef: any = React.useRef();
	const executionRef: any = React.useRef();
	const supportRef: any = React.useRef();

	const { open: openControl, setOpen: setOpenControl } = AccordionCardsController();
	const { open: openDevelopment, setOpen: setOpenDevelopment } = AccordionCardsController();
	const { open: openSurveillance, setOpen: setOpenSurveillance } = AccordionCardsController();
	const { open: openDirecting, setOpen: setOpenDirecting } = AccordionCardsController();
	const { open: openCustomerAndChainInteraction, setOpen: setOpenCustomerAndChainInteraction } =
    AccordionCardsController();
	const { open: openExecution, setOpen: setOpenExecution } = AccordionCardsController();
	const { open: openSupport, setOpen: setOpenSupport } = AccordionCardsController();

	const viewControl = () => controlRef.current.scrollIntoView();
	const viewDevelopment = () => developmentRef.current.scrollIntoView();
	const viewSurveillance = () => surveillanceRef.current.scrollIntoView();
	const viewDirecting = () => directingRef.current.scrollIntoView();
	const viewCustomerAndChainInteraction = () => customerAndChainInteractionRef.current.scrollIntoView();
	const viewExecution = () => executionRef.current.scrollIntoView();
	const viewSupport = () => supportRef.current.scrollIntoView();

	const Control = categories.filter((category) => {
		return t(_.upperFirst(category.domain)) === t("Control");
	});
	const Development = categories.filter((category) => {
		return t(_.upperFirst(category.domain)) === t("Development");
	});
	const Surveillance = categories.filter((category) => {
		return t(_.upperFirst(category.domain)) === t("Surveillance");
	});
	const Directing = categories.filter((category) => {
		return t(_.upperFirst(category.domain)) === t("Directing");
	});
	const CustomerAndChainInteraction = categories.filter((category) => {
		return t(_.upperFirst(category.domain)) === t("Customer and chain interaction");
	});
	const Execution = categories.filter((category) => {
		return t(_.upperFirst(category.domain)) === t("Execution");
	});
	const support = categories.filter((category) => {
		return t(_.upperFirst(category.domain)) === t("Support");
	});

	return (
		<>
			<CategoriesAccordionFiltersTemplate
				items={[
					{ label: t("Control"), handleClick: viewControl, active: openControl, disabled: !Control.length },
					{
						label: t("Development"),
						handleClick: viewDevelopment,
						active: openDevelopment,
						disabled: !Development.length,
					},
					{
						label: t("Surveillance"),
						handleClick: viewSurveillance,
						active: openSurveillance,
						disabled: !Surveillance.length,
					},
					{
						label: t("Directing"),
						handleClick: viewDirecting,
						active: openDirecting,
						disabled: !Directing.length,
					},
					{
						label: t("Customer and chain interaction"),
						handleClick: viewCustomerAndChainInteraction,
						active: openCustomerAndChainInteraction,
						disabled: !CustomerAndChainInteraction.length,
					},
					{
						label: t("Execution"),
						handleClick: viewExecution,
						active: openExecution,
						disabled: !Execution.length,
					},
					{ label: t("Support"), handleClick: viewSupport, active: openSupport, disabled: !support.length },
				]}
			/>
			<div id="Control" ref={controlRef}>
				<Accordion
					open={openControl}
					setOpen={setOpenControl}
					header={
						<CategoriesCardsAccordionHeaderTemplate
							title={t("Control")}
							active={openControl}
							badgeNumber={Control.length}
						/>
					}
				>
					<Categories categories={Control} />
				</Accordion>
			</div>

			<div id="Development" ref={developmentRef}>
				<Accordion
					open={openDevelopment}
					setOpen={setOpenDevelopment}
					header={
						<CategoriesCardsAccordionHeaderTemplate
							title={t("Development")}
							active={openDevelopment}
							badgeNumber={Development.length}
						/>
					}
				>
					<Categories categories={Development} />
				</Accordion>
			</div>

			<div id="Surveillance" ref={surveillanceRef}>
				<Accordion
					open={openSurveillance}
					setOpen={setOpenSurveillance}
					header={
						<CategoriesCardsAccordionHeaderTemplate
							title={t("Surveillance")}
							active={openSurveillance}
							badgeNumber={Surveillance.length}
						/>
					}
				>
					<Categories categories={Surveillance} />
				</Accordion>
			</div>

			<div id="Directing" ref={directingRef}>
				<Accordion
					open={openDirecting}
					setOpen={setOpenDirecting}
					header={
						<CategoriesCardsAccordionHeaderTemplate
							title={t("Directing")}
							active={openDirecting}
							badgeNumber={Directing.length}
						/>
					}
				>
					<Categories categories={Directing} />
				</Accordion>
			</div>

			<div id="Customer and chain interaction" ref={customerAndChainInteractionRef}>
				<Accordion
					open={openCustomerAndChainInteraction}
					setOpen={setOpenCustomerAndChainInteraction}
					header={
						<CategoriesCardsAccordionHeaderTemplate
							title={t("Customer and chain interaction")}
							active={openCustomerAndChainInteraction}
							badgeNumber={CustomerAndChainInteraction.length}
						/>
					}
				>
					<Categories categories={CustomerAndChainInteraction} />
				</Accordion>
			</div>

			<div id="Execution" ref={executionRef}>
				<Accordion
					open={openExecution}
					setOpen={setOpenExecution}
					header={
						<CategoriesCardsAccordionHeaderTemplate
							title={t("Execution")}
							active={openExecution}
							badgeNumber={Execution.length}
						/>
					}
				>
					<Categories categories={Execution} />
				</Accordion>
			</div>

			<div id="Support" ref={supportRef}>
				<Accordion
					open={openSupport}
					setOpen={setOpenSupport}
					header={
						<CategoriesCardsAccordionHeaderTemplate
							title={t("Support")}
							active={openSupport}
							badgeNumber={support.length}
						/>
					}
				>
					<Categories categories={support} />
				</Accordion>
			</div>
		</>
	);
};

interface CategoriesProps {
  categories: any[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
	return (
		<div className={styles.ComponentsGrid}>
			{categories.map((category, idx) => (
				<CategoryCard
					key={idx}
					title={{ label: category.title, href: `/categories/${category.id}` }}
					description={category.shortDescription}
					icon={category.icon}
				/>
			))}
		</div>
	);
};
