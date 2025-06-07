import styles from "./styles.module.css";

export interface Props {
  className?: string;
  label: string;
  iconUrl?: string;
  onClick: () => void;
}

export default function Button({ className, label, iconUrl, onClick }: Props) {
  const classList = [];
  if (className) classList.push(className);
  if (iconUrl) {
    classList.push(styles.iconButton);
    return (
      <img
        className={classList.join(" ")}
        alt={label}
        title={label}
        src={iconUrl}
        onClick={onClick}
      />
    );
  }
  classList.push(styles.textButton);
  return (
    <div className={classList.join(" ")} onClick={onClick}>
      {label}
    </div>
  );
}
