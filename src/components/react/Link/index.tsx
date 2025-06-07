import styles from "./styles.module.css";

export default function Link({ url, label }: { url: string; label?: string }) {
  return (
    <a className={styles.anchor} href={url} target="_blank">
      {label || url}
    </a>
  );
}
