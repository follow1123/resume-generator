import resumeSty from "@/components/react/resume/styles.module.css";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

import { TextAreaEditor } from "@/components/react/Editor";
import { MarkdownRenderer } from "@/components/react/Renderer";

import type { ResponsibilitiesType } from "@/libs/resumeSchema";

import type { UpdaterProps } from "@/components/react/resume/types";

import { isBlank } from "@/libs/stringUtils";
import { notify } from "@/libs/notification";
import {
  AddButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from "@/components/react/Button/buttons";
import { classList } from "@/libs/utils";
import { remove, swap } from "@/libs/utils/listUtils";

const itemName = "个人职责";
const minItemsNum = 1;

export default function Responsibilities({
  data: initialData,
  onUpdate,
}: UpdaterProps<ResponsibilitiesType>) {
  const [data, setData] = useState(initialData);
  const [editIdx, setEditIdx] = useState<number | null>(null);
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
    <div>
      <div className={classList(resumeSty.toolBarContainer, styles.heading)}>
        <span className={styles.label}>{itemName}：</span>
        <div className={resumeSty.toolBar}>
          <AddButton
            onClick={() => {
              setEditIdx(data.length);
              setData([...data, ""]);
            }}
          />
        </div>
      </div>

      <ul className={classList(resumeSty.list, styles.list)}>
        {data.map((d, i) => {
          const hasEdit = editIdx !== null;
          const isEdit = editIdx === i;

          const listItemProps = !hasEdit
            ? {
                title: "双击修改",
                onDoubleClick: () => setEditIdx(i),
                className: resumeSty.toolBarContainer,
              }
            : {};

          return (
            <li key={d} {...listItemProps}>
              {isEdit ? (
                <TextAreaEditor
                  className={resumeSty.editor}
                  value={d}
                  onConfirm={(v) => handleConfirm(i, v)}
                />
              ) : (
                <MarkdownRenderer value={d} />
              )}
              {!hasEdit && (
                <div className={resumeSty.toolBar}>
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
    </div>
  );
}
