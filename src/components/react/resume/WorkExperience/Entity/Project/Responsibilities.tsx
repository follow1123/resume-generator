import styles from "./styles.module.css";
import RtInput from "@/components/react/RtInput";
import { useRef, useState } from "react";
import type {
  ResponsibilitiesType,
  ResponsibilityType,
} from "@/libs/resumeSchema";
import List from "@/components/react/List";
import ListItemToolBar from "@/components/react/ListItemToolBar";
import type {
  ItemUpdaterProps,
  UpdaterProps,
} from "@/components/react/resume/types";

import { isBlank } from "@/libs/stringUtils";
import { notify } from "@/libs/notification";
import Button from "@/components/react/Button";
import addUrl from "@/assets/add.svg?url";

const itemName = "个人职责";
const minItemsNum = 1;

function Item({ index, list, onUpdate }: ItemUpdaterProps<ResponsibilityType>) {
  const data: ResponsibilityType | undefined = list[index];
  const [edit, setEdit] = useState(data === undefined);
  const dataRef = useRef(data);

  const handleConfirm = (v: string) => {
    if (isBlank(v)) {
      if (list.length === minItemsNum) {
        notify({
          type: "warn",
          text: `至少需要${minItemsNum}条 '${itemName}' 信息`,
        });
        return;
      }
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
      editing={edit}
    />
  );

  if (edit) {
    return itemNode;
  } else {
    return (
      <div title="双击修改" onDoubleClick={() => setEdit(true)}>
        <ListItemToolBar
          toolFilter={() => list.length !== minItemsNum}
          index={index}
          list={list}
          onUpdate={onUpdate}
          children={itemNode}
        />
      </div>
    );
  }
}

export default function Responsibilities({
  data,
  onUpdate,
}: UpdaterProps<ResponsibilitiesType>) {
  const [responsibilities, setResponsibilities] = useState(
    data || ([] as ResponsibilitiesType),
  );

  return (
    <div>
      <div className={styles.itemHeading}>
        <span className={styles.label}>{itemName}：</span>
        <Button
          className={styles.buttons}
          label="添加"
          iconUrl={addUrl}
          onClick={() => {
            // @ts-ignore
            setResponsibilities([...responsibilities, undefined]);
          }}
        />
      </div>

      <List
        indent={1}
        items={responsibilities.map((responsibility, i) => ({
          key: `${responsibility}-${i}`,
          item: (
            <Item
              list={responsibilities}
              index={i}
              onUpdate={(list) => {
                onUpdate(list);
                setResponsibilities(list);
              }}
            />
          ),
        }))}
      />
    </div>
  );
}
