import resumeSty from "@/components/react/resume/styles.module.css";
import { useEffect, useState } from "react";
import type { OtherDescriptionsType } from "@/libs/resumeSchema";
import type { UpdaterProps } from "@/components/react/resume/types";

import { isBlank } from "@/libs/stringUtils";
import { remove, swap } from "@/libs/utils/listUtils";
import { TextAreaEditor } from "@/components/react/Editor";
import { MarkdownRenderer } from "@/components/react/Renderer";
import {
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from "@/components/react/Button/buttons";

type RequiredOtherDescs = Exclude<OtherDescriptionsType, undefined>;

export default function OtherDescriptions({
  data: initialData,
  onUpdate,
}: UpdaterProps<RequiredOtherDescs>) {
  const [data, setData] = useState(initialData);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleRemove = (i: number) => {
    const newData = remove(data, i);
    onUpdate(newData);
    setData(newData);
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
      {data.map((d, i) => {
        const hasEdit = editIdx !== null || d === "";
        const isEdit = editIdx === i || d === "";

        const listItemProps = !hasEdit
          ? {
              title: "双击修改",
              onDoubleClick: () => setEditIdx(i),
              className: resumeSty.toolBarContainer,
            }
          : {};

        return (
          <div key={d} {...listItemProps}>
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
                {i !== 0 && <MoveUpButton onClick={() => handleSwap(i, -1)} />}
                {i !== data.length - 1 && (
                  <MoveDownButton onClick={() => handleSwap(i, 1)} />
                )}
                <RemoveButton onClick={() => handleRemove(i)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
