import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Heading1, Link, Paragraph } from "@gemeente-denhaag/components-react";
import { Container, Tag } from "@conduction/components";
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
    <Container>
      <div className={styles.container}>
        <div className={styles.backButton} onClick={() => navigate("/components")}>
          <Link icon={<ArrowLeftIcon />} iconAlign="start">
            {t("Back to components")}
          </Link>
        </div>

        {!getComponents.isLoading && component && (
          <>
            <div className={styles.heading}>
              <div>
                <Heading1>{component.name}</Heading1>
                <span className={styles.subtitle}>
                  Phasellus tempus. Aenean vulputate eleifend tellus. Sed a libero.
                </span>
              </div>
              <div className={styles.tags}>
                <Tag tag={component.intendedAudience} />
                <Tag tag={component.developmentStatus} />
              </div>
            </div>

            <Paragraph className={styles.description}>{component.description}</Paragraph>

            <a className={styles.externalLink} href={component.isBasedOn} target="_blank">
              <Link icon={<ArrowRightIcon />} iconAlign="start">
                {t("View component on GitHub")}
              </Link>
            </a>
          </>
        )}

        {getComponents.isLoading && <Skeleton height="250px" />}
      </div>
    </Container>
  );
};
