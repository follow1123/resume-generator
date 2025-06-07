import RtInput from "@/components/react/RtInput";
import styles from "./styles.module.css";
import { useRef, useState } from "react";
import { isBlank } from "@/libs/stringUtils";
import { notify } from "@/libs/notification";
import type { UpdaterProps } from "@/components/react/resume/types";

export const Desc = ({ data, onUpdate }: UpdaterProps<string>) => {
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
    <div>
      <span className={styles.label}>项目描述：</span>
      <RtInput
        editing={edit}
        editorType="textarea"
        value={dataRef.current}
        editorProps={{
          className: styles.editor,
          onConfirm: handleConfirm,
        }}
        rendererProps={{
          title: "双击修改",
          onDoubleClick: () => setEdit(true),
        }}
      />
    </div>
  );
};
