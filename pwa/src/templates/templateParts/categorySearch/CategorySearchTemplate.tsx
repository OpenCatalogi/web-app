import * as React from "react";
import * as styles from "./CategorySearchTemplate.module.css";
import clsx from "clsx";
import { categories } from "../../../data/categories";
import { LayerAccordion } from "../layerAccordion/LayerAccordionTemplate";

export const CategorySearchTemplate: React.FC = () => {
  const Accordion = LayerAccordion.accordion;
  const AccordionController = LayerAccordion.controller;

  const { open: openInteraction, setOpen: setOpenInteraction } = AccordionController();
  const { open: openProcess, setOpen: setOpenProcess } = AccordionController();
  const { open: openIntegration, setOpen: setOpenIntegration } = AccordionController();
  const { open: openServices, setOpen: setOpenServices } = AccordionController();
  const { open: openData, setOpen: setOpenData } = AccordionController();

  return (
    <>
      <div className={styles.filters}>
        <span
          onClick={() => setOpenInteraction((o) => !o)}
          className={clsx(styles.interaction, openInteraction && styles.open)}
        >
          Interactie
        </span>

        <span onClick={() => setOpenProcess((o) => !o)} className={clsx(styles.process, openProcess && styles.open)}>
          Proces
        </span>

        <span
          onClick={() => setOpenIntegration((o) => !o)}
          className={clsx(styles.integration, openIntegration && styles.open)}
        >
          Integratie
        </span>

        <span onClick={() => setOpenServices((o) => !o)} className={clsx(styles.services, openServices && styles.open)}>
          Services
        </span>

        <span onClick={() => setOpenData((o) => !o)} className={clsx(styles.data, openData && styles.open)}>
          Data
        </span>
      </div>

      <Accordion
        title="Interactie"
        open={openInteraction}
        setOpen={setOpenInteraction}
        color="#CFE2FF"
        categories={categories.interaction}
      />

      <Accordion
        title="Proces"
        open={openProcess}
        setOpen={setOpenProcess}
        color="#F8D7DA"
        categories={categories.process}
      />

      <Accordion
        title="Integratie"
        open={openIntegration}
        setOpen={setOpenIntegration}
        color="#FFF3CD"
        categories={categories.integration}
      />

      <Accordion
        title="Services"
        open={openServices}
        setOpen={setOpenServices}
        color="#D1E7DD"
        categories={categories.services}
      />

      <Accordion title="Data" open={openData} setOpen={setOpenData} color="#E2D9F3" categories={categories.data} />
    </>
  );
};
