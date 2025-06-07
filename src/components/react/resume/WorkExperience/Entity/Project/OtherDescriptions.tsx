import styles from "./styles.module.css";
import RtInput from "@/components/react/RtInput";
import { useRef, useState } from "react";
import type {
  OtherDescriptionsType,
  OtherDescriptionType,
} from "@/libs/resumeSchema";
import ListItemToolBar from "@/components/react/ListItemToolBar";
import type {
  ItemUpdaterProps,
  UpdaterProps,
} from "@/components/react/resume/types";

import { isBlank } from "@/libs/stringUtils";

function Item({
  index,
  list,
  onUpdate,
}: ItemUpdaterProps<OtherDescriptionType>) {
  const data: OtherDescriptionType | undefined = list[index];
  const [edit, setEdit] = useState(data === undefined);
  const dataRef = useRef(data);

  const handleConfirm = (v: string) => {
    if (isBlank(v)) {
      onUpdate(list.filter((_, i) => i !== index));
      return;
    }
    // 修改内容没有改变数组结构，不需要父组件重新渲染
    // 所以直接修改内容即可
    list[index] = v;
    onUpdate(list);
    dataRef.current = v;
    setEdit(false);
  };

  const itemNode = (
    <RtInput
      editorProps={{
        className: styles.editor,
        onConfirm: handleConfirm,
      }}
      value={dataRef.current}
      editorType="textarea"
      rendererType="markdown"
      editing={edit}
    />
  );

  if (edit) {
    return itemNode;
  } else {
    return (
      <div title="双击修改" onDoubleClick={() => setEdit(true)}>
        <ListItemToolBar
          toolFilter={(t) => t === "remove"}
          index={index}
          list={list}
          onUpdate={onUpdate}
          children={itemNode}
        />
      </div>
    );
  }
}

type RequiredOtherDescs = Exclude<OtherDescriptionsType, undefined>;

export default function OtherDescriptions({
  data,
  onUpdate,
}: UpdaterProps<OtherDescriptionsType>) {
  const [otherDescs, setOtherDescs] = useState(
    data || ([] as RequiredOtherDescs),
  );

  return (
    <div>
      {otherDescs.map((o, i) => (
        <Item
          key={`${o}=${i}`}
          list={otherDescs}
          index={i}
          onUpdate={(list) => {
            if (list.length === 0) {
              onUpdate(undefined);
            } else {
              onUpdate(list);
              setOtherDescs(list);
            }
          }}
        />
      ))}
    </div>
  );
}
