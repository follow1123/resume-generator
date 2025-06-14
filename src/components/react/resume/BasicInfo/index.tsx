import resumeSty from "@/components/react/resume/styles.module.css";
import styles from "./styles.module.css";
import type { BasicInfoType } from "@/libs/resumeSchema";
import { useEffect, useRef, useState } from "react";
import Section from "../Section";
import { notify } from "@/libs/notification";
import { isBlank } from "@/libs/stringUtils";
import { getInfoList, Info, toBasicInfo } from "./data";

import { TextEditor } from "@/components/react/Editor";
import { TextRenderer } from "@/components/react/Renderer";

import { classList } from "@/libs/utils";
import { RemoveButton } from "@/components/react/Button/buttons";
import PopoverButton from "@/components/react/PopoverButton";
import type { Option } from "@/components/react/PopoverButton";
import addUrl from "@/assets/add.svg?url";
import type { UpdaterProps } from "../types";

const sectionName = "基本信息";

export default function BasicInfo({
  data,
  onUpdate,
}: UpdaterProps<BasicInfoType>) {
  const [render, setRender] = useState(false);
  const dataRef = useRef<Info[]>(undefined);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  // 由于列表是定义好的，只有 data 值改变时才会修改列表内的数据
  useEffect(() => {
    dataRef.current = getInfoList(data);
    setRender(!render);
  }, [data]);

  const handleRemove = (info: Info) => {
    if (info.readonly) {
      notify(`'${info.name}' 不能为空`, "warn");
    } else {
      info.value = undefined;
      if (dataRef.current) {
        onUpdate(toBasicInfo(dataRef.current));
      }
      setRender(!render);
    }
    setEditIdx(null);
  };

  const handleConfirm = (info: Info, v: string) => {
    if (isBlank(v)) {
      handleRemove(info);
      return;
    }

    if (info.setValue(v)) {
      if (dataRef.current) {
        onUpdate(toBasicInfo(dataRef.current));
      }
      setRender(!render);
      setEditIdx(null);
    }
  };

  const handleAdd = (key: string) => {
    const idx = Number(key);
    if (dataRef.current) {
      dataRef.current[idx].value = "";
      setRender(!render);
      setEditIdx(idx);
    }
  };

  // 未使用的数据
  const unusedInfoList = dataRef.current
    ? dataRef.current
        .map((info, i) => {
          if (info.value !== undefined) return {} as Option;
          return {
            name: info.name,
            value: String(i),
          };
        })
        .filter((o) => o.name)
    : [];

  const sectionProps =
    unusedInfoList.length > 0
      ? {
          operation: (
            <PopoverButton
              position="bottom-right"
              label="添加"
              iconUrl={addUrl}
              list={unusedInfoList}
              onSelected={handleAdd}
            />
          ),
        }
      : {};

  return (
    <Section title={sectionName} {...sectionProps}>
      <ul className={classList(resumeSty.list, styles.list)}>
        {dataRef.current?.map((d, i) => {
          if (d.value === undefined) return undefined;
          const hasEdit = editIdx !== null;
          const isEdit = editIdx === i;

          const listItemProps = !hasEdit
            ? {
                title: "双击修改",
                onDoubleClick: () => setEditIdx(i),
                className: classList(
                  styles.listItem,
                  resumeSty.toolBarContainer,
                ),
              }
            : {
                className: styles.listItem,
              };
          return (
            <li key={d.key} {...listItemProps}>
              <span dangerouslySetInnerHTML={{ __html: d.label }}></span>：
              {isEdit ? (
                <TextEditor
                  className={styles.editor}
                  value={d.getValue()}
                  onConfirm={(v) => handleConfirm(d, v)}
                />
              ) : (
                <TextRenderer value={d.getValue(true)} />
              )}
              {!hasEdit && (
                <div className={resumeSty.toolBar}>
                  {!d.readonly && (
                    <RemoveButton onClick={() => handleRemove(d)} />
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
