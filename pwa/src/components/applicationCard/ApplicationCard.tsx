import * as React from "react";
import * as styles from "./ApplicationCard.module.css";
import { Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import _ from "lodash";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { ToolTip } from "../toolTip/ToolTip";
import { useTranslation } from "react-i18next";
import { Tag } from "@conduction/components";

export interface ApplicationCardProps {
  title: {
    label: string;
    href: string;
  };
  description: string;
  tags: {
    organization?: string;
    githubLink?: string;
  };
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ title, description, tags }) => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.titleLink} onClick={() => navigate(title.href)}>
				<Link icon={<ArrowRightIcon />} iconAlign="start">
					{title.label}
				</Link>
			</div>

			<Paragraph className={styles.description}>{description}</Paragraph>

			<div className={styles.tags}>
				{tags.organization && (
					<ToolTip tooltip="Organisatie">
						<Tag label={tags.organization} icon={<FontAwesomeIcon icon={faHouse} />} />
					</ToolTip>
				)}
				{tags.githubLink && (
					<ToolTip tooltip="Demo">
						<Tag
							label={t("Demo")}
							icon={<FontAwesomeIcon icon={faLaptopCode} />}
							onClick={() => open(tags.githubLink)}
						/>
					</ToolTip>
				)}
			</div>
		</div>
	);
};
