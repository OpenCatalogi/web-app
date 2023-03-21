import * as React from "react";
import * as styles from "./FeedbackTemplate.module.css";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";
import { Button } from "@gemeente-denhaag/components-react";
import clsx from "clsx";

interface FeedbackTemplateProps {
  layoutClassName?: string;
}

export const FeedbackTemplate: React.FC<FeedbackTemplateProps> = ({ layoutClassName }) => {
	return (
		<div className={clsx(styles.container, layoutClassName && layoutClassName)}>
			<span className={styles.heading}>Wensen of feedback?</span>

			<span className={styles.description}>
        Iedereen die geïnteresseerd is in dit product kan de roadmap bekijken of zelf ideën aandragen.
			</span>
			<div className={styles.buttons}>
				<Button
					variant="secondary-action"
					onClick={() =>
						open(
							"https://github.com/OpenCatalogi/.github/issues/new?assignees=rubenvdlinde%2CRonaldvCortenberghe&labels=feature-request&template=feature.yml&title=%5Bfeature%5D%3A+Als+gebruiker+wil+ik+",
						)
					}
					icon={<ExternalLinkIcon />}
				>
          Wens of opmerking indienen op GitHub
				</Button>
				<Button
					variant="secondary-action"
					onClick={() => open("https://github.com/orgs/OpenCatalogi/projects/1")}
					icon={<ExternalLinkIcon />}
				>
          Roadmap bekijken
				</Button>
			</div>
		</div>
	);
};
