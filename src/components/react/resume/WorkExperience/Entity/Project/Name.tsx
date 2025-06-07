import styles from "./styles.module.css";
import RtInput from "@/components/react/RtInput";
import { isBlank } from "@/libs/stringUtils";
import { notify } from "@/libs/notification";
import { useRef, useState } from "react";
import type { UpdaterProps } from "@/components/react/resume/types";

export default function Name({ data, onUpdate }: UpdaterProps<string>) {
  const [edit, setEdit] = useState(data === undefined);
  const dataRef = useRef(data);

  const handleConfirm = (v: string) => {
    if (isBlank(v)) {
      notify({
        type: "warn",
        text: "项目名称不能为空",
      });
      return;
    }
    if (dataRef.current !== v) {
      dataRef.current = v;
      onUpdate(v);
    }
    setEdit(false);
  };

  return (
    <RtInput
      editorType="text"
      editorProps={{
        placeholder: "项目名称",
        className: styles.editor,
        onConfirm: handleConfirm,
      }}
      rendererProps={{
        className: styles.label,
        title: "双击修改",
        onDoubleClick: () => setEdit(true),
      }}
      editing={edit}
      value={dataRef.current}
    />
  );
}
