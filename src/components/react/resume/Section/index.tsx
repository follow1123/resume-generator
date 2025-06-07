import type { PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  title: string;
  operation?: ReactNode;
}
export default function Section(props: PropsWithChildren<Props>) {
  return (
    <div className={styles.section}>
      <div className={styles.title}>
        <h3>{props.title}</h3>
        <div className={styles.operation}>{props.operation}</div>
      </div>
      <section>{props.children}</section>
    </div>
  );
}
