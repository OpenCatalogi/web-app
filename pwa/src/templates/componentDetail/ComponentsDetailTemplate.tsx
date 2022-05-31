import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Heading1, Link } from "@gemeente-denhaag/components-react";
import { Container } from "../../components/container/Container";
import { Tags } from "../../components/tags/Tags";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";
import { useComponent } from "../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

interface ComponentsDetailTemplateProps {
  componentId: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId }) => {
  const [component, setComponent] = React.useState<any>(null);
  const { t } = useTranslation();

  const _useComponent = useComponent();
  const getComponents = _useComponent.getAll();

  React.useEffect(() => {
    if (!getComponents.isSuccess) return;

    const _component = getComponents.data.find((c: any) => c.id === componentId);
    setComponent(_component);
  }, [getComponents.isSuccess]);

  return (
    <Container layoutClassName={styles.componentsDetailContainer}>
      <div className={styles.back} onClick={() => navigate("/components")}>
        <Link className={styles.link} icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to components")}
        </Link>
      </div>
      {!getComponents.isLoading && component ? (
        <>
          <div className={styles.heading}>
            <div>
              <Heading1 className={styles.title}>{component.name}</Heading1>
              <span className={styles.subtitle}>Phasellus tempus. Aenean vulputate eleifend tellus. Sed a libero.</span>
            </div>
            <Tags tags={[component.intendedAudience, component.developmentStatus]} />
          </div>
          <p className={styles.description}>{component.description}</p>

          <a className={styles.link} href={component.isBasedOn} target="_blank">
            <Link className={styles.link} icon={<ArrowRightIcon />} iconAlign="start">
              {t("View component on GitHub")}
            </Link>
          </a>
        </>
      ) : (
        <Skeleton height="250px" />
      )}
    </Container>
  );
};
