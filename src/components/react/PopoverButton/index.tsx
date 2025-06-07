import { useRef } from "react";
import styles from "./styles.module.css";

import Button from "@/components/react/Button";

export interface Option {
  name: string;
  value: string;
}

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";

export interface GroupedOption {
  name: string;
  options: Option[];
}

interface Props {
  label: string;
  iconUrl?: string;
  list: (Option | GroupedOption)[];
  onSelected: (v: string) => void;
  position?: Position;
}

const setVisible = (e: Element, visible: boolean) => {
  if (visible) {
    if (e.classList.contains(styles.hidden)) {
      e.classList.replace(styles.hidden, styles.show);
    }
  } else {
    if (e.classList.contains(styles.show)) {
      e.classList.replace(styles.show, styles.hidden);
    }
  }
};

const isVisible = (e: Element) => {
  return e.classList.contains(styles.show);
};

const popoverClass = "popover-button-label";

document.addEventListener("click", (e) => {
  const element = e.target as HTMLElement;
  if (!element.classList.contains(styles.select)) {
    let current: Element | null = null;
    if (element.classList.contains(popoverClass)) {
      current = element.nextElementSibling;
    }
    document
      .querySelectorAll(`.${styles.select}.${styles.show}`)
      .forEach((s) => {
        if (s !== current) {
          setVisible(s, false);
        }
      });
  }
});

const getSize = (list: (Option | GroupedOption)[]): number => {
  let size: number;
  if ("value" in list[0]) {
    size = list.length;
  } else {
    size = list.reduce((s, g) => {
      return (s += (g as GroupedOption).options.length);
    }, list.length);
  }
  if (size === 1) {
    size += 1;
  }
  return size;
};

export default function PopoverButton({
  list,
  onSelected,
  position = "bottom-left",
  ...rest
}: Props) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSelectToggle = () => {
    if (!selectRef.current) return;

    setVisible(selectRef.current, !isVisible(selectRef.current));
  };

  const handleSelectChanged: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    onSelected(e.target.value);
    e.target.value = "";
    setVisible(e.target, false);
  };

  return (
    <div className={styles.container}>
      <Button
        {...rest}
        className={popoverClass}
        onClick={list.length === 0 ? () => onSelected("") : handleSelectToggle}
      />
      {list.length > 0 && (
        <select
          ref={selectRef}
          autoFocus
          className={`${styles.select} ${styles[position]} ${styles.hidden}`}
          onChange={handleSelectChanged}
          autoComplete="false"
          size={getSize(list)}
        >
          {list.map((v) => {
            if ("value" in v) {
              return (
                <option key={v.name} value={v.value}>
                  {v.name}
                </option>
              );
            } else {
              if (v.options.length === 0) {
                return undefined;
              }
              return (
                <optgroup key={v.name} label={v.name}>
                  {v.options.map(({ name, value }) => (
                    <option key={name} value={value}>
                      {name}
                    </option>
                  ))}
                </optgroup>
              );
            }
          })}
        </select>
      )}
    </div>
  );
}
