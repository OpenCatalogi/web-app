import * as React from "react";
import * as styles from "./VerticalFiltersTemplate.module.css";
import { useForm } from "react-hook-form";
import { FiltersContext } from "../../../../context/filters";
import FormField, { FormFieldInput, FormFieldLabel } from "@gemeente-denhaag/form-field";
import { SelectMultiple, SelectSingle } from "@conduction/components";
import _ from "lodash";
import clsx from "clsx";
import { Divider } from "@gemeente-denhaag/components-react";
import { upls, platforms, maintenanceTypes, softwareTypes, licenses, statuses } from "./../../../../data/filters";
import {
  getSelectedItemFromFilters,
  getSelectedItemsFromFilters,
} from "../../../../services/getSelectedItemsFromFilters";
import { useGemma } from "../../../../hooks/gemma";

interface VerticalFiltersTemplateProps {
  layoutClassName?: string;
}

export const VerticalFiltersTemplate: React.FC<VerticalFiltersTemplateProps> = ({ layoutClassName }) => {
  const [filters, setFilters] = React.useContext(FiltersContext);

  const [applicatiefuncties, setApplicatiefuncties] = React.useState<any[]>([]);
  const [bedrijfsfuncties, setBedrijfsfuncties] = React.useState<any[]>([]);
  const [bedrijfsservices, setBedrijfsservices] = React.useState<any[]>([]);
  const [referentieComponents, setReferentieComponents] = React.useState<any[]>([]);

  const _useGemma = useGemma();
  const getApplicatiefuncties = _useGemma.getApplicatiefuncties();
  const getBedrijfsfuncties = _useGemma.getBedrijfsfuncties();
  const getBedrijfsservices = _useGemma.getBedrijfsservices();
  const getReferentieComponents = _useGemma.getReferentieComponents();

  React.useEffect(() => {
    if (!getApplicatiefuncties.isSuccess) return;

    setApplicatiefuncties(getApplicatiefuncties.data.map((item: any) => ({ value: item.id, label: item.name })));
  }, [getApplicatiefuncties.isSuccess]);

  React.useEffect(() => {
    if (!getBedrijfsfuncties.isSuccess) return;

    setBedrijfsfuncties(getBedrijfsfuncties.data.map((item: any) => ({ value: item.id, label: item.name })));
  }, [getBedrijfsfuncties.isSuccess]);

  React.useEffect(() => {
    if (!getBedrijfsservices.isSuccess) return;

    setBedrijfsservices(getBedrijfsservices.data.map((item: any) => ({ value: item.id, label: item.name })));
  }, [getBedrijfsservices.isSuccess]);

  React.useEffect(() => {
    if (!getReferentieComponents.isSuccess) return;

    setReferentieComponents(getReferentieComponents.data.map((item: any) => ({ value: item.id, label: item.name })));
  }, [getReferentieComponents.isSuccess]);

  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    reset({
      upl: getSelectedItemsFromFilters(upls, filters["nl.upl"]),
      platforms: getSelectedItemsFromFilters(platforms, filters.platforms),
      bedrijfsfuncties: getSelectedItemsFromFilters(bedrijfsfuncties, filters["nl.gemma.bedrijfsfuncties"]),
      bedrijfsservices: getSelectedItemsFromFilters(bedrijfsservices, filters["nl.gemma.bedrijfsservices"]),
      referentieComponenten: getSelectedItemsFromFilters(
        referentieComponents,
        filters["nl.gemma.referentieComponenten"],
      ),
      applicatiefunctie: getSelectedItemFromFilters(applicatiefuncties, filters["nl.gemma.applicatiefunctie"]),
      softwareType: getSelectedItemFromFilters(softwareTypes, filters.softwareType),
      status: getSelectedItemFromFilters(statuses, filters.developmentStatus),
      maintenanceType: getSelectedItemFromFilters(maintenanceTypes, filters["maintenance.type"]),
      license: getSelectedItemFromFilters(licenses, filters["legal.license"]),
    });
  }, [filters]);

  React.useEffect(() => {
    const subscription = watch(
      ({
        upl,
        platforms,
        maintenanceType,
        status,
        softwareType,
        license,
        bedrijfsservices,
        bedrijfsfuncties,
        referentieComponenten,
        applicatiefunctie,
      }) => {
        setFilters({
          ...filters,
          currentPage: 1,
          platforms: platforms?.map((p: any) => p.value),
          "nl.gemma.bedrijfsfuncties": bedrijfsfuncties?.map((b: any) => b.value),
          "nl.gemma.bedrijfsservices": bedrijfsservices?.map((b: any) => b.value),
          "nl.gemma.referentieComponenten": referentieComponenten?.map((rC: any) => rC.value),
          "nl.gemma.applicatiefunctie": applicatiefunctie?.value,
          softwareType: softwareType?.value,
          developmentStatus: status?.value,
          "maintenance.type": maintenanceType?.value,
          "legal.license": license?.value,
          "nl.upl": upl?.map((u: any) => u.value),
        });
      },
    );

    return () => subscription.unsubscribe();
  });

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <span className={styles.title}>Filters</span>

      <Divider />

      <form className={styles.form}>
        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>UPL</span>
            </FormFieldLabel>
            <SelectMultiple name="upl" options={upls} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Platforms</span>
            </FormFieldLabel>
            <SelectMultiple name="platforms" options={platforms} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Status</span>
            </FormFieldLabel>
            <SelectSingle name="status" options={statuses} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Onderhoudstypes</span>
            </FormFieldLabel>
            <SelectSingle name="maintenanceType" options={maintenanceTypes} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Softwaretypes</span>
            </FormFieldLabel>
            <SelectSingle name="softwareType" options={softwareTypes} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Licentie</span>
            </FormFieldLabel>
            <SelectSingle name="license" options={licenses} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Bedrijfsfuncties</span>
            </FormFieldLabel>
            <SelectMultiple name="bedrijfsfuncties" options={bedrijfsfuncties} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Bedrijfsservices</span>
            </FormFieldLabel>
            <SelectMultiple name="bedrijfsservices" options={bedrijfsservices} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Referentie componenten</span>
            </FormFieldLabel>
            <SelectMultiple
              name="referentieComponenten"
              options={referentieComponents}
              {...{ errors, control, register }}
            />
          </FormFieldInput>
        </FormField>

        <FormField>
          <FormFieldInput>
            <FormFieldLabel>
              <span className={styles.label}>Applicatiefunctie</span>
            </FormFieldLabel>
            <SelectSingle name="applicatiefunctie" options={applicatiefuncties} {...{ errors, control, register }} />
          </FormFieldInput>
        </FormField>
      </form>
    </div>
  );
};
