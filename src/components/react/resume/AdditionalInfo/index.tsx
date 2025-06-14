import styles from "@/components/react/resume/styles.module.css";
import Section from "../Section";
import type { AdditionalItemsType } from "@/libs/resumeSchema";
import { useEffect, useState } from "react";

import { TextAreaEditor } from "@/components/react/Editor";
import { MarkdownRenderer } from "@/components/react/Renderer";

import { isBlank } from "@/libs/stringUtils";
import { notify } from "@/libs/notification";
import { remove, swap } from "@/libs/utils/listUtils";
import {
  AddButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from "@/components/react/Button/buttons";
import type { UpdaterProps } from "../types";

const sectionName = "其他信息";
const minItemsNum = 1;

export default function AdditionalInfo({
  data: initialData,
  onUpdate,
}: UpdaterProps<AdditionalItemsType>) {
  const [data, setData] = useState(initialData);
  const [editIdx, setEditIdx] = useState<number | null>(null);
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
    setEditIdx(null);
  };

  const handleConfirm = (i: number, v: string) => {
    if (isBlank(v)) {
      handleRemove(i);
      return;
    }
    const newData = [...data];
    newData[i] = v;
    onUpdate(newData);
    setData(newData);
    setEditIdx(null);
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
            setEditIdx(data.length);
            setData([...data, ""]);
          }}
        />
      }
    >
      <ul className={styles.list}>
        {data.map((d, i) => {
          const hasEdit = editIdx !== null;
          const isEdit = editIdx === i;

          const listItemProps = !hasEdit
            ? {
                title: "双击修改",
                onDoubleClick: () => setEditIdx(i),
                className: styles.toolBarContainer,
              }
            : {};

          return (
            <li key={d} {...listItemProps}>
              {isEdit ? (
                <TextAreaEditor
                  className={styles.editor}
                  value={d}
                  onConfirm={(v) => handleConfirm(i, v)}
                />
              ) : (
                <MarkdownRenderer value={d} />
              )}
              {!hasEdit && (
                <div className={styles.toolBar}>
                  {i !== 0 && (
                    <MoveUpButton onClick={() => handleSwap(i, -1)} />
                  )}
                  {i !== data.length - 1 && (
                    <MoveDownButton onClick={() => handleSwap(i, 1)} />
                  )}
                  {data.length > minItemsNum && (
                    <RemoveButton onClick={() => handleRemove(i)} />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
