import type { ProjectsType } from "@/libs/resumeSchema";
import type { UpdaterProps } from "@/components/react/resume/types";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import Project from "./Project";
import {
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from "@/components/react/Button/buttons";
import { remove, swap } from "@/libs/utils/listUtils";
import { notify } from "@/libs/notification";

const itemName = "项目";
const minItemsNum = 1;

export default function Projects({
  data: initialData,
  onUpdate,
}: UpdaterProps<ProjectsType>) {
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleRemove = (i: number) => {
    if (data.length <= minItemsNum) {
      notify(`至少需要${minItemsNum}条 '${itemName}' 信息`, "warn");
    } else {
      const newData = remove(data, i);
      onUpdate(newData);
      setData(newData);
    }
  };

  const handleSwap = (i: number, o: number) => {
    const newData = swap(data, i, o);
    onUpdate(newData);
    setData(newData);
  };

  return (
    <div className={styles.projectsContainer}>
      {data.map((d, i) => (
        <Project
          key={d.name}
          data={d}
          onUpdate={(v) => {
            const newData = [...data];
            newData[i] = v;
            onUpdate(newData);
          }}
          operation={
            <>
              {i !== 0 && <MoveUpButton onClick={() => handleSwap(i, -1)} />}
              {i !== data.length - 1 && (
                <MoveDownButton onClick={() => handleSwap(i, 1)} />
              )}
              {data.length > minItemsNum && (
                <RemoveButton onClick={() => handleRemove(i)} />
              )}
            </>
          }
        />
      ))}
    </div>
  );
}
