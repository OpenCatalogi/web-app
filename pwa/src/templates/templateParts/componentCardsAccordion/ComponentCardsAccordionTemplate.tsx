import * as React from "react";
import * as styles from "./ComponentCardsAccordionTemplate.module.css";
import _ from "lodash";
import { getTokenValue } from "../../../services/getTokenValue";
import { ComponentCard } from "../../../components/componentCard/ComponentCard";
import { LayerAccordion } from "../layerAccordion/LayerAccordionTemplate";
import { LayerAccordionFiltersTemplate } from "../layerAccordion/filters/LayerAccordionFiltersTemplate";
import { ComponentCardsAccordionHeaderTemplate } from "./header/ComponentCardsAccordionHeaderTemplate";
import { Button, ButtonGroup, ColorSample } from "@utrecht/component-library-react";
import clsx from "clsx";
interface ComponentCardsAccordionProps {
  components: any[];
}

export const ComponentCardsAccordionTemplate: React.FC<ComponentCardsAccordionProps> = ({ components }) => {
  const Accordion = LayerAccordion.accordion;
  const AccordionCardsController = LayerAccordion.controller;

  const { open: openInteraction, setOpen: setOpenInteraction } = AccordionCardsController();
  const { open: openProcess, setOpen: setOpenProcess } = AccordionCardsController();
  const { open: openIntegration, setOpen: setOpenIntegration } = AccordionCardsController();
  const { open: openServices, setOpen: setOpenServices } = AccordionCardsController();
  const { open: openData, setOpen: setOpenData } = AccordionCardsController();
  const { open: openUnknown, setOpen: setOpenUnknown } = AccordionCardsController();

  const interaction = components.filter((component) => {
    return _.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType) === "Interface";
  });
  const process = components.filter((component) => {
    return _.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType) === "Process";
  });
  const integration = components.filter((component) => {
    return _.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType) === "Integration";
  });
  const services = components.filter((component) => {
    return _.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType) === "Service";
  });
  const data = components.filter((component) => {
    return _.upperFirst(component?.embedded?.nl?.embedded?.commonground?.layerType) === "Data";
  });
  const unknown = components.filter((component) => {
    return component?.embedded?.nl?.embedded?.commonground?.layerType === (null || undefined);
  });

  return (
    <>
      <ButtonGroup>
        <Button
          appearance="subtle-button"
          className={clsx(styles.LayerFilter, styles.LayerFilterInteraction)}
          disabled={interaction.length === 0}
          onClick={() => {
            setOpenInteraction(!openInteraction);
          }}
          pressed={!openInteraction}
        >
          <ColorSample
            className={styles.LayerColorSample}
            color={
              interaction.length === 0
                ? getTokenValue(styles.layerColorDisabled)
                : getTokenValue(styles.layerColorInteraction)
            }
          />
          Interaction
        </Button>
        <Button
          className={clsx(styles.LayerFilter, styles.LayerFilterProcess)}
          appearance="subtle-button"
          disabled={process.length === 0}
          onClick={() => {
            setOpenProcess(!openProcess);
          }}
          pressed={!openProcess}
        >
          <ColorSample
            className={styles.LayerColorSample}
            color={
              process.length === 0 ? getTokenValue(styles.layerColorDisabled) : getTokenValue(styles.layerColorProcess)
            }
          />
          Process
        </Button>
        <Button
          className={clsx(styles.LayerFilter, styles.LayerFilterIntegration)}
          appearance="subtle-button"
          disabled={integration.length === 0}
          onClick={() => {
            setOpenIntegration(!openIntegration);
          }}
          pressed={!openIntegration}
        >
          <ColorSample
            className={styles.LayerColorSample}
            color={
              integration.length === 0
                ? getTokenValue(styles.layerColorDisabled)
                : getTokenValue(styles.layerColorIntegration)
            }
          />
          Intergration
        </Button>
        <Button
          className={clsx(styles.LayerFilter, styles.LayerFilterServices)}
          appearance="subtle-button"
          disabled={services.length === 0}
          onClick={() => {
            setOpenServices(!openServices);
          }}
          pressed={!openServices}
        >
          <ColorSample
            className={styles.LayerColorSample}
            color={
              services.length === 0
                ? getTokenValue(styles.layerColorDisabled)
                : getTokenValue(styles.layerColorServices)
            }
          />
          Service
        </Button>
        <Button
          className={clsx(styles.LayerFilter, styles.LayerFilterData)}
          appearance="subtle-button"
          disabled={data.length === 0}
          onClick={() => {
            setOpenData(!openData);
          }}
          pressed={!openData}
        >
          <ColorSample
            className={styles.LayerColorSample}
            color={data.length === 0 ? getTokenValue(styles.layerColorDisabled) : getTokenValue(styles.layerColorData)}
          />
          Data
        </Button>
        <Button
          className={clsx(styles.LayerFilter, styles.LayerFilterUnkown)}
          appearance="subtle-button"
          disabled={unknown.length === 0}
          onClick={() => {
            setOpenUnknown(!openUnknown);
          }}
          pressed={!openUnknown}
        >
          <ColorSample
            className={styles.LayerColorSample}
            color={
              unknown.length === 0 ? getTokenValue(styles.layerColorDisabled) : getTokenValue(styles.layerColorUnknown)
            }
          />
          Unkown
        </Button>
      </ButtonGroup>
      <LayerAccordionFiltersTemplate
        items={[
          {
            label: "Interaction",
            handleClick: setOpenInteraction,
            active: openInteraction,
            disabled: !interaction.length,
          },
          { label: "Process", handleClick: setOpenProcess, active: openProcess, disabled: !process.length },
          {
            label: "Integration",
            handleClick: setOpenIntegration,
            active: openIntegration,
            disabled: !integration.length,
          },
          { label: "Service", handleClick: setOpenServices, active: openServices, disabled: !services.length },
          { label: "Data", handleClick: setOpenData, active: openData, disabled: !data.length },
          { label: "Unknown", handleClick: setOpenUnknown, active: openUnknown, disabled: !unknown.length },
        ]}
      />

      <Accordion
        open={openInteraction}
        setOpen={setOpenInteraction}
        color={getTokenValue(styles.layerColorInteraction)}
        disabled={!interaction.length}
        header={
          <ComponentCardsAccordionHeaderTemplate
            title="Interaction"
            active={openInteraction}
            badgeNumber={interaction.length}
          />
        }
      >
        <Components components={interaction} />
      </Accordion>

      <Accordion
        open={openProcess}
        setOpen={setOpenProcess}
        color={getTokenValue(styles.layerColorProcess)}
        disabled={!process.length}
        header={
          <ComponentCardsAccordionHeaderTemplate title="Process" active={openProcess} badgeNumber={process.length} />
        }
      >
        <Components components={process} />
      </Accordion>

      <Accordion
        open={openIntegration}
        setOpen={setOpenIntegration}
        color={getTokenValue(styles.layerColorIntegration)}
        disabled={!integration.length}
        header={
          <ComponentCardsAccordionHeaderTemplate
            title="Integration"
            active={openIntegration}
            badgeNumber={integration.length}
          />
        }
      >
        <Components components={integration} />
      </Accordion>

      <Accordion
        open={openServices}
        setOpen={setOpenServices}
        color={getTokenValue(styles.layerColorServices)}
        disabled={!services.length}
        header={
          <ComponentCardsAccordionHeaderTemplate title="Services" active={openServices} badgeNumber={services.length} />
        }
      >
        <Components components={services} />
      </Accordion>

      <Accordion
        open={openData}
        setOpen={setOpenData}
        color={getTokenValue(styles.layerColorData)}
        disabled={!data.length}
        header={<ComponentCardsAccordionHeaderTemplate title="Data" active={openData} badgeNumber={data.length} />}
      >
        <Components components={data} />
      </Accordion>

      <Accordion
        open={openUnknown}
        setOpen={setOpenUnknown}
        color={getTokenValue(styles.layerColorUnknown)}
        disabled={!unknown.length}
        header={
          <ComponentCardsAccordionHeaderTemplate title="Unknown" active={openUnknown} badgeNumber={unknown.length} />
        }
      >
        <Components components={unknown} />
      </Accordion>
    </>
  );
};

interface ComponentsProps {
  components: any[];
}

const Components: React.FC<ComponentsProps> = ({ components }) => {
  return (
    <div className={styles.ComponentsGrid}>
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          title={{ label: component.name, href: `/components/${component.id ?? component._self.id}` }}
          description={component.embedded?.description?.shortDescription}
          layer={component.embedded?.nl?.embedded?.commonground?.layerType ?? "Unknown"}
          categories={component.categories}
          tags={{
            status: component.developmentStatus,
            installations: component.usedBy?.length.toString() ?? "0",
            organization: {
              name: component.embedded?.url?.embedded?.organisation?.name,
              website: component.embedded?.url?.embedded?.organisation?.website,
            },
            licence: component.embedded?.legal?.license,
            githubLink: component.embedded?.url?.url,
          }}
        />
      ))}
    </div>
  );
};
