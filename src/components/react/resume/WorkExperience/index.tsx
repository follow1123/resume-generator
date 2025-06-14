import styles from "./styles.module.css";
import Section from "../Section";
import type { EntityType, ExperiencesType } from "@/libs/resumeSchema";
import Entity from "./Entity";
import { useEffect, useState } from "react";

import {
  AddButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from "@/components/react/Button/buttons";
import { getTemplateEntity } from "./data";
import { notify } from "@/libs/notification";
import { remove, swap } from "@/libs/utils/listUtils";
import type { UpdaterProps } from "../types";

const sectionName = "工作经历";
const minItemsNum = 1;

export default function WorkExperience({
  data: initialData,
  onUpdate,
}: UpdaterProps<ExperiencesType>) {
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleRemove = (i: number) => {
    if (data.length <= minItemsNum) {
      notify(`至少需要${minItemsNum}条 '${sectionName}' 信息`, "warn");
    } else {
      const newData = remove(data, i);
      onUpdate(newData);
      setData(newData);
    }
  };

  const handleConfirm = (i: number, v: EntityType) => {
    const newData = [...data];
    newData[i] = v;
    onUpdate(newData);
    setData(newData);
  };

  const handleSwap = (i: number, o: number) => {
    const newData = swap(data, i, o);
    onUpdate(newData);
    setData(newData);
  };

  return (
    <Section
      title={sectionName}
      operation={
        <AddButton
          onClick={() => {
            setData([getTemplateEntity(), ...data]);
          }}
        />
      }
    >
      <div className={styles.experiences}>
        {data.map((exp, i) => (
          <Entity
            key={exp.name}
            data={exp}
            onUpdate={(v) => handleConfirm(i, v)}
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
    </Section>
  );
}
