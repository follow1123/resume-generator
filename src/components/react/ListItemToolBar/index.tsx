import styles from "./styles.module.css";

import upUrl from "@/assets/up.svg?url";
import downUrl from "@/assets/down.svg?url";
import removeUrl from "@/assets/remove.svg?url";

import Button from "@/components/react/Button";

import type { Props as ButtonProps } from "@/components/react/Button";

import type { PropsWithChildren } from "react";

type ToolType = "move-up" | "move-down" | "remove";

const toolTypes: ToolType[] = ["move-up", "move-down", "remove"];

const getToolButtons = ({
  index,
  list,
  onUpdate,
  toolFilter,
}: Props<any>): React.ReactNode[] => {
  let tools = toolTypes.filter((t) => {
    switch (t) {
      case "remove":
        return true;
      case "move-up":
        return index !== 0;
      case "move-down":
        return index !== list.length - 1;
      default:
        return false;
    }
  });

  if (toolFilter) {
    tools = tools.filter(toolFilter);
  }

  return tools.map((t) => {
    let buttonProps: ButtonProps;
    switch (t) {
      case "move-up":
        if (index === 0) {
          return undefined;
        }
        buttonProps = {
          label: "上移",
          iconUrl: upUrl,
          onClick: () => onUpdate(swapElement(list, index, -1)),
        };
        break;
      case "move-down":
        if (index === length - 1) {
          return undefined;
        }
        buttonProps = {
          label: "下移",
          iconUrl: downUrl,
          onClick: () => onUpdate(swapElement(list, index, 1)),
        };
        break;
      case "remove":
        buttonProps = {
          label: "删除",
          iconUrl: removeUrl,
          onClick: () => onUpdate(removeElement(list, index)),
        };
        break;
      default:
        throw `invalid tool type: ${t}`;
    }
    return <Button key={t} {...buttonProps} />;
  });
};

export function removeElement(list: any[], index: number): any[] {
  return list.filter((_, i) => i !== index);
}

export function swapElement(
  list: any[],
  index: number,
  swapOffset: number,
): any[] {
  const targetIdx = index + swapOffset;
  if (targetIdx < 0 || targetIdx >= list.length) {
    throw new Error(`invalid offset: ${swapOffset}, index: ${index}`);
  }
  const newData = [...list];
  [newData[targetIdx], newData[index]] = [newData[index], newData[targetIdx]];
  return newData;
}

interface ActionFilter {
  (type: ToolType): boolean;
}

interface Props<T> {
  index: number;
  list: T[];
  onUpdate(list: T[]): void;
  toolFilter?: ActionFilter;
}

export default function ListToolBar<T>(props: PropsWithChildren<Props<T>>) {
  const toolsBar = (
    <div className={styles.toolBar}>{getToolButtons(props)}</div>
  );
  return (
    <div className={styles.container}>
      {props.children}
      {toolsBar}
    </div>
  );
}
