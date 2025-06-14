import { classList } from "@/libs/utils";
import styles from "./styles.module.css";
import type { Props } from "./types";

export default function Button({ className, label, iconUrl, onClick }: Props) {
  if (iconUrl) {
    return (
      <img
        className={classList(className, styles.iconButton)}
        alt={label}
        title={label}
        src={iconUrl}
        onClick={onClick}
      />
    );
  }
  return (
    <div className={classList(styles.textButton, className)} onClick={onClick}>
      {label}
    </div>
  );
}
