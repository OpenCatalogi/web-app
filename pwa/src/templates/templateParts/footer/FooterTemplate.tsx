import * as React from "react";
import * as styles from "./FooterTemplate.module.css";
import clsx from "clsx";
import parse from "html-react-parser";
import { PageFooter, Link, Heading3, Icon } from "@utrecht/component-library-react/dist/css-module";
import { navigate } from "gatsby-link";
import { defaultFiltersContext, useFiltersContext } from "../../../context/filters";
import { useTranslation } from "react-i18next";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFooterContent } from "../../../hooks/footerContent";

export const DEFAULT_FOOTER_CONTENT_URL =
  "https://raw.githubusercontent.com/OpenCatalogi/web-app/development/pwa/src/templates/templateParts/footer/FooterContent.json";

type TDynamicContentItem = {
  title: string;
  items: {
    value: string;
    ariaLabel: string;
    link?: string;
    markdownLink?: string;
    label?: string;
    icon?: {
      icon: IconName;
      prefix: IconPrefix;
      placement: "left" | "right";
    };
    customIcon?: {
      icon: string;
      placement: "left" | "right";
    };
    setFilter?: {
      filter: string;
      value: string;
      link: string;
    };
  }[];
};

interface FooterTemplateProps {
  layoutClassName?: string;
}

export const FooterTemplate: React.FC<FooterTemplateProps> = ({ layoutClassName }) => {
  const [footerContent, setFooterContent] = React.useState<TDynamicContentItem[]>([]);

  const _useFooterContent = useFooterContent();
  const getFooterContent = _useFooterContent.getContent();

  // For Production
  React.useEffect(() => {
    setFooterContent(getFooterContent.data);
  }, [getFooterContent]);

  // For development
  // React.useEffect(() => {
  //   const data = require("./FooterContent.json");
  //   setFooterContent(data);
  // }, []);

  return (
    <PageFooter className={clsx(styles.footer, layoutClassName && layoutClassName)}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {footerContent?.map((content, idx) => (
            <DynamicSection key={idx} {...{ content }} />
          ))}
        </div>

        <div className={styles.logoAndConduction}>
          <Logo />
          <WithLoveByConduction />
        </div>
      </div>
    </PageFooter>
  );
};

const DynamicSection: React.FC<{ content: TDynamicContentItem }> = ({ content }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading3 className={styles.dynamicSectionTitle}>{t(content.title)}</Heading3>

      {content.items.map((item, idx) => (
        <div key={idx} className={styles.dynamicSectionContent}>
          {item.label && <strong>{t(item.label)}</strong>}
          {/* External Link */}
          {item.link && item.link.includes("http") && <ExternalLink {...{ item }} />}

          {/* Internal Link */}
          {item.link && !item.link.includes("http") && !item.setFilter && <InternalLink {...{ item }} />}

          {/* Internal Link Github/Markdown link */}
          {item.markdownLink && !item.setFilter && <MarkdownLink {...{ item }} />}

          {/* Internal filter link */}
          {!item.link && item.setFilter && <FilterLink {...{ item }} />}

          {/* No Link */}
          {!item.link && !item.setFilter && !item.markdownLink && <NoLink {...{ item }} />}
        </div>
      ))}
    </section>
  );
};

const Logo: React.FC = () => {
  if (process.env.GATSBY_FOOTER_LOGO_URL === "false") return <></>;
  const { t } = useTranslation();

  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.image}
        onClick={() => (process.env.GATSBY_FOOTER_LOGO_URL ? open(process.env.GATSBY_FOOTER_LOGO_URL) : navigate("/"))}
        src={process.env.GATSBY_FOOTER_LOGO_URL}
        alt={t("Footer-logo")}
        aria-label={`${t("Footer-logo")}, ${t("Can open a new window")}`}
        tabIndex={0}
      />
    </div>
  );
};

const WithLoveByConduction: React.FC = () => {
  // if (process.env.GATSBY_FOOTER_SHOW_CREATOR === "false") return <></>;

  const { t } = useTranslation();

  return (
    <div>
      <Link
        className={styles.withLoveLink}
        href="https://github.com/OpenCatalogi/web-app"
        target="_blank"
        aria-label={`${t("Link to github repository")}, ${t("Opens a new window")}`}
      >
        <Icon>
          <FontAwesomeIcon icon={faCode} />
        </Icon>
      </Link>{" "}
      with{" "}
      <Link
        className={styles.withLoveLink}
        href="https://github.com/OpenCatalogi/web-app/graphs/contributors"
        target="_blank"
        aria-label={`${t("Link to github contributors page")}, ${t("Opens a new window")}`}
      >
        <Icon>
          <FontAwesomeIcon icon={faHeart} />
        </Icon>
      </Link>{" "}
      by{" "}
      <Link
        className={styles.withLoveLink}
        href="https://conduction.nl"
        target="_blank"
        aria-label={`${t("Link to conduction website")}, ${t("Opens a new window")}`}
      >
        <span className={styles.withLoveConductionLink}> Conduction.</span>
      </Link>
    </div>
  );
};

interface LinkComponentProps {
  item: any;
}

const ExternalLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={styles.link}
      href={item.link}
      target="_blank"
      tabIndex={0}
      aria-label={`${t(item.ariaLabel)}, ${t("Opens a new window")}`}
    >
      {item.customIcon && item.customIcon.placement === "left" && (
        <Icon className={styles.iconLeft}>{parse(item.customIcon.icon)}</Icon>
      )}

      {item.icon && item.icon.placement === "left" && (
        <Icon className={styles.iconLeft}>
          <FontAwesomeIcon icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {t(item.value)}

      {item.icon && item.icon.placement === "right" && (
        <Icon className={styles.iconRight}>
          <FontAwesomeIcon icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "right" && (
        <Icon className={styles.iconRight}>{parse(item.customIcon.icon)}</Icon>
      )}
    </Link>
  );
};

const InternalLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={styles.link}
      onClick={() => navigate(item.link ?? "")}
      tabIndex={0}
      aria-label={`${t(item.ariaLabel)}, ${t(item.value)}`}
      role="button"
    >
      {item.icon && item.icon.placement === "left" && (
        <Icon className={styles.iconLeft}>
          <FontAwesomeIcon icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "left" && (
        <Icon className={styles.iconLeft}>{parse(item.customIcon.icon)}</Icon>
      )}

      {t(item.value)}

      {item.icon && item.icon.placement === "right" && (
        <Icon className={styles.iconRight}>
          <FontAwesomeIcon icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "right" && (
        <Icon className={styles.iconRight}>{parse(item.customIcon.icon)}</Icon>
      )}
    </Link>
  );
};

const MarkdownLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={styles.link}
      onClick={() => navigate(`/github/${item.value.replaceAll(" ", "_")}/?link=${item.markdownLink}`)}
      tabIndex={0}
      aria-label={`${t(item.ariaLabel)}, ${t(item.markdownLink)}`}
      role="button"
    >
      {item.icon && item.icon.placement === "left" && (
        <Icon className={styles.iconLeft}>
          <FontAwesomeIcon className={styles.iconLeft} icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "left" && (
        <Icon className={styles.iconLeft}>{parse(item.customIcon.icon)}</Icon>
      )}

      {t(item.value)}

      {item.icon && item.icon.placement === "right" && (
        <Icon className={styles.iconRight}>
          <FontAwesomeIcon className={styles.iconRight} icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "right" && (
        <Icon className={styles.iconRight}>{parse(item.customIcon.icon)}</Icon>
      )}
    </Link>
  );
};

const FilterLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();
  const { setFilters } = useFiltersContext();

  return (
    <Link
      className={styles.link}
      onClick={() => {
        setFilters({ ...defaultFiltersContext, [item.setFilter!.filter]: item.setFilter!.value });
        navigate(item.setFilter!.link);
      }}
      tabIndex={0}
      aria-label={`${t(item.ariaLabel)}, ${t(item.value)}`}
      role="button"
    >
      {item.icon && item.icon.placement === "left" && (
        <Icon className={styles.iconLeft}>
          <FontAwesomeIcon icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "left" && (
        <Icon className={styles.iconLeft}>{parse(item.customIcon.icon)}</Icon>
      )}

      {t(item.value)}

      {item.icon && item.icon.placement === "right" && (
        <Icon className={styles.iconRight}>
          <FontAwesomeIcon className={styles.iconRight} icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "right" && (
        <Icon className={styles.iconRight}>{parse(item.customIcon.icon)}</Icon>
      )}
    </Link>
  );
};

const NoLink: React.FC<LinkComponentProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <span>
      {item.customIcon && item.customIcon.placement === "left" && (
        <Icon className={styles.iconLeft}>{parse(item.customIcon.icon)}</Icon>
      )}

      {item.icon && item.icon.placement === "left" && (
        <Icon className={styles.iconLeft}>
          <FontAwesomeIcon className={styles.iconLeft} icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {t(item.value)}

      {item.icon && item.icon.placement === "right" && (
        <Icon className={styles.iconRight}>
          <FontAwesomeIcon className={styles.iconRight} icon={[item.icon.prefix, item.icon.icon]} />
        </Icon>
      )}

      {item.customIcon && item.customIcon.placement === "right" && (
        <Icon className={styles.iconRight}>{parse(item.customIcon.icon)}</Icon>
      )}
    </span>
  );
};
