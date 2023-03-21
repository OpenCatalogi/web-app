import clsx from "clsx";
import _ from "lodash";
import * as React from "react";
import * as styles from "./ToolTip.module.css";

interface ToolTipProps {
  children: React.ReactNode;
  tooltip: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({ children, tooltip }) => {
	const [active, setActive] = React.useState(false);

	return (
		<div className={styles.wrapper} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
			{children}
			{active && <div className={clsx(styles.content, styles.top)}>{tooltip}</div>}
		</div>
	);
};

interface NodeToolTipProps {
  tooltip: string;
}

export const NodeToolTip: React.FC<NodeToolTipProps> = ({ tooltip }) => {
	return (
		<div className={styles.wrapper}>
			<div className={clsx(styles.content, styles.top)}>{tooltip}</div>
		</div>
	);
};
