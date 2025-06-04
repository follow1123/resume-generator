import styles from "./styles.module.css";

import { useEffect, useRef, useState } from "react";
import { notify } from "@/libs/notification";
import { ZodError, z } from "zod/v4";

import RtInput from "@/components/react/RtInput";
import ListItemToolBar from "@/components/react/ListItemToolBar";
import type { ItemUpdaterProps } from "../types";
import { isBlank } from "@/libs/stringUtils";
import type { ValueType, InfoItem } from "./types";

export default function Item({
  index,
  list,
  onUpdate,
}: ItemUpdaterProps<InfoItem>) {
  const {
    label,
    text,
    value,
    fixed,
    parser = (v) => v,
    formatter = (v) => String(v),
  } = list[index];
  const [edit, setEdit] = useState(value === undefined);
  const [render, setRender] = useState(false);
  const dataRef = useRef(value);

  useEffect(() => {
    dataRef.current = value;
    setRender(!render);
  }, [value]);

  const handleConfirm = (v: string) => {
    try {
      if (isBlank(v)) {
        if (fixed) {
          notify({
            type: "warn",
            text: "这个信息不能为空",
          });
        } else {
          onUpdate(list.filter((_, i) => i !== index));
        }
        return;
      }
      dataRef.current = parser(v);
      list[index].value = dataRef.current;
      setEdit(false);
    } catch (e) {
      if (e instanceof ZodError) {
        notify({
          type: "error",
          text: z.prettifyError(e),
        });
      }
      console.error(e);
    }
  };

  const itemNode = (
    <>
      <span dangerouslySetInnerHTML={{ __html: label || text }}></span>：
      <RtInput
        editorProps={{
          className: styles.input,
          onConfirm: handleConfirm,
        }}
        value={
          edit
            ? dataRef.current
              ? String(dataRef.current)
              : ""
            : formatter(dataRef.current as ValueType)
        }
        editing={edit}
      />
    </>
  );

  if (edit) {
    return itemNode;
  } else {
    return (
      <div title="双击修改" onDoubleClick={() => setEdit(true)}>
        <ListItemToolBar
          toolFilter={(t) => !fixed && t === "remove"}
          key={index}
          index={index}
          list={list}
          onUpdate={onUpdate}
          children={itemNode}
        />
      </div>
    );
  }
}
