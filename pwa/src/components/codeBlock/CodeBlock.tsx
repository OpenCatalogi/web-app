import * as React from "react";
import * as styles from "./CodeBlock.module.css";


interface CodeBlockProps {
  codeBlock: string | JSX.Element;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ codeBlock }) => <div className={styles.code}>{codeBlock}</div>;
