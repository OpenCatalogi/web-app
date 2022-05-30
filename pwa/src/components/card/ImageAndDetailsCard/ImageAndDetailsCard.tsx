import * as React from "react";
import * as styles from "./ImageAndDetailsCard.module.css";
import clsx from "clsx";
import { Link } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

interface ImageAndDetailsCardProps {
  title: string;
  image: JSX.Element;
  introduction: string;
  link: {
    href: string;
    label: string;
  };
  subHeader?: string;
  layoutClassName?: string;
  iconAlign?: boolean;
}

export const ImageAndDetailsCard: React.FC<ImageAndDetailsCardProps> = ({
  image,
  title,
  subHeader,
  introduction,
  link,
  layoutClassName,
  iconAlign,
}) => {
  return (
    <div className={clsx(styles.container, [layoutClassName && layoutClassName])} onClick={() => navigate(link.href)}>
      <div className={styles.image}>{image}</div>

      <div className={styles.content}>
        <div>
          <div className={styles.title}>{title}</div>

          <span className={styles.subHeader}>{subHeader}</span>
        </div>

        <div className={styles.introduction}>{introduction}</div>

        <div className={styles.link}>
          <Link icon={<ArrowRightIcon />} iconAlign={iconAlign ? "start" : "end"}>
            {link.label}
          </Link>
        </div>
      </div>
    </div>
  );
};
