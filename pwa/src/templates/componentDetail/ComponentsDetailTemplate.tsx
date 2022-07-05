import * as React from "react";
import * as styles from "./ComponentsDetailTemplate.module.css";
import { Heading1, Link, Paragraph } from "@gemeente-denhaag/components-react";
import { Container, Tag } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import { components as c } from "./../../testData/components";

interface ComponentsDetailTemplateProps {
  componentId: string;
}

export const ComponentsDetailTemplate: React.FC<ComponentsDetailTemplateProps> = ({ componentId }) => {
  const [component] = React.useState<any>(c.find((_c) => _c.id === componentId));
  const { t } = useTranslation();

  return (
    <Container layoutClassName={styles.container}>
      <div className={styles.backButton} onClick={() => navigate("/components")}>
        <Link icon={<ArrowLeftIcon />} iconAlign="start">
          {t("Back to components")}
        </Link>
      </div>

      <div className={styles.heading}>
        <div>
          <Heading1>{component.name}</Heading1>
          <span className={styles.subtitle}>Phasellus tempus. Aenean vulputate eleifend tellus. Sed a libero.</span>
        </div>
        <div className={styles.tags}>
          <Tag tag={component.layer} />
          <Tag tag={component.status} />
        </div>
      </div>

      <Paragraph className={styles.description}>{component.description}</Paragraph>

      <a className={styles.externalLink} href={component.isBasedOn} target="_blank">
        <Link icon={<ArrowRightIcon />} iconAlign="start">
          {t("View component on GitHub")}
        </Link>
      </a>
    </Container>
  );
};
