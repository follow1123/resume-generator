import styles from "./styles.module.css";
import RtInput from "@/components/react/RtInput";
import { useRef, useState } from "react";
import type { TechStackType, TechStacksType } from "@/libs/resumeSchema";
import List from "@/components/react/List";
import ListItemToolBar from "@/components/react/ListItemToolBar";
import type {
  ItemUpdaterProps,
  UpdaterProps,
} from "@/components/react/resume/types";
import { isBlank } from "@/libs/stringUtils";
import Button from "@/components/react/Button";
import addUrl from "@/assets/add.svg?url";

const itemName = "技术栈";

function Item({ index, list, onUpdate }: ItemUpdaterProps<TechStackType>) {
  const data = list[index];
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
      editing={edit}
    />
  );

  if (edit) {
    return itemNode;
  } else {
    return (
      <div title="双击修改" onDoubleClick={() => setEdit(true)}>
        <ListItemToolBar
          index={index}
          list={list}
          onUpdate={onUpdate}
          children={itemNode}
        />
      </div>
    );
  }
}

type RequiredTechStacks = Exclude<TechStacksType, undefined>;

export default function TechStack({
  data,
  onUpdate,
}: UpdaterProps<TechStacksType>) {
  const [techStacks, setTechStacks] = useState(
    data || ([] as RequiredTechStacks),
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
            setTechStacks([...techStacks, undefined]);
          }}
        />
      </div>

      <List
        indent={1}
        items={techStacks.map((stack, i) => ({
          key: `${stack}-${i}`,
          item: (
            <Item
              list={techStacks}
              index={i}
              onUpdate={(list) => {
                if (list.length === 0) {
                  onUpdate(undefined);
                } else {
                  onUpdate(list);
                  setTechStacks(list);
                }
              }}
            />
          ),
        }))}
      />
    </div>
  );
}
