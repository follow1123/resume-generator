import type { ProjectType } from "@/libs/resumeSchema";
import styles from "./styles.module.css";
import { useRef, useState } from "react";
import Name from "./Name";
import { Desc } from "./Desc";
import TechStacks from "./TechStacks";
import Responsibilities from "./Responsibilities";
import type { ItemUpdaterProps } from "@/components/react/resume/types";
import OtherDescriptions from "./OtherDescriptions";
import Button from "@/components/react/Button";
import stackUrl from "@/assets/stack.svg?url";
import addItemUrl from "@/assets/addItem.svg?url";
import upUrl from "@/assets/up.svg?url";
import downUrl from "@/assets/down.svg?url";
import removeUrl from "@/assets/remove.svg?url";
import { removeElement, swapElement } from "@/components/react/ListItemToolBar";

export default function Project({
  index,
  list,
  onUpdate,
}: ItemUpdaterProps<ProjectType>) {
  const data = list[index];
  const dataRef = useRef(data || ({} as ProjectType));
  const [render, setRender] = useState(false);
  const updateParent = () => {
    list[index] = dataRef.current;
    onUpdate(list);
  };

  return (
    <div className={styles.project}>
      <div className={styles.heading}>
        <div className={styles.headLeft}>
          <Name
            data={dataRef.current.name}
            onUpdate={(v) => {
              dataRef.current.name = v;
              updateParent();
            }}
          />
        </div>

        {dataRef.current.techStacks === undefined && (
          <Button
            className={styles.buttons}
            label="添加项目技术栈"
            iconUrl={stackUrl}
            onClick={() => {
              // @ts-ignore
              dataRef.current.techStacks = [undefined];
              updateParent();
              setRender(!render);
            }}
          />
        )}
        <Button
          className={styles.buttons}
          label="添加项目描述"
          iconUrl={addItemUrl}
          onClick={() => {
            if (dataRef.current.otherDescriptions === undefined) {
              dataRef.current.otherDescriptions = [];
            }
            // @ts-ignore
            dataRef.current.otherDescriptions.push(undefined);

            updateParent();
            setRender(!render);
          }}
        />
        {index !== 0 && (
          <Button
            className={styles.buttons}
            label="上移"
            iconUrl={upUrl}
            onClick={() => {
              onUpdate(swapElement(list, index, -1));
            }}
          />
        )}
        {index !== list.length - 1 && (
          <Button
            className={styles.buttons}
            label="下移"
            iconUrl={downUrl}
            onClick={() => {
              onUpdate(swapElement(list, index, 1));
            }}
          />
        )}
        {list.length !== 1 && (
          <Button
            className={styles.buttons}
            label="删除"
            iconUrl={removeUrl}
            onClick={() => {
              onUpdate(removeElement(list, index));
            }}
          />
        )}
      </div>

      <Desc
        data={dataRef.current.desc}
        onUpdate={(v) => {
          dataRef.current.desc = v;
          updateParent();
        }}
      />
      {dataRef.current.otherDescriptions && (
        <OtherDescriptions
          data={dataRef.current.otherDescriptions}
          onUpdate={(v) => {
            dataRef.current.otherDescriptions = v;
            updateParent();
            if (dataRef.current.otherDescriptions === undefined) {
              setRender(!render);
            }
          }}
        />
      )}
      {dataRef.current.techStacks && (
        <TechStacks
          data={dataRef.current.techStacks}
          onUpdate={(v) => {
            dataRef.current.techStacks = v;
            updateParent();
            if (dataRef.current.techStacks === undefined) {
              setRender(!render);
            }
          }}
        />
      )}
      <Responsibilities
        data={dataRef.current.responsibilities}
        onUpdate={(v) => {
          dataRef.current.responsibilities = v;
          updateParent();
        }}
      />
    </div>
  );
}
