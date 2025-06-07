import { useRef, useState } from "react";
import styles from "./styles.module.css";
import type { EntityType } from "@/libs/resumeSchema";
import type { ItemUpdaterProps } from "@/components/react/resume/types";
import Name from "./Name";
import Duration from "./Duration";
import Button from "@/components/react/Button";
import addItemUrl from "@/assets/addItem.svg?url";
import Projects from "./Projects";

export default function Entity({
  index,
  list,
  onUpdate,
}: ItemUpdaterProps<EntityType>) {
  const data = list[index];
  const dataRef = useRef(data || ({} as EntityType));
  const [render, setRender] = useState(false);
  const { name, joiningDate, leavingDate, projects } = dataRef.current;
  const updateParent = () => {
    list[index] = dataRef.current;
    onUpdate(list);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.headLeft}>
          <Name
            data={name}
            onUpdate={(v) => {
              dataRef.current.name = v;
              updateParent();
            }}
          />
        </div>
        <Duration
          data={{ joiningDate, leavingDate }}
          onUpdate={(v) => {
            dataRef.current = { ...dataRef.current, ...v };
            updateParent();
          }}
        />
        <Button
          className={styles.buttons}
          label="添加项目"
          iconUrl={addItemUrl}
          onClick={() => {
            dataRef.current.projects.push({
              name: "xxx 系统",
              desc: "xxxxxxxx",
              responsibilities: ["负责 xxx 模块"],
            });
            setRender(!render);
          }}
        />
      </div>

      <Projects
        data={projects}
        onUpdate={(v) => {
          dataRef.current.projects = v;
          updateParent();
        }}
      />
    </div>
  );
}
