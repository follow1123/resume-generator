import styles from "./styles.module.css";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import type { EntityType } from "@/libs/resumeSchema";
import type { UpdaterProps } from "@/components/react/resume/types";
import { DateEditor, TextEditor } from "@/components/react/Editor";
import { TextRenderer } from "@/components/react/Renderer";
import { isBlank } from "@/libs/stringUtils";
import { notify } from "@/libs/notification";
import { getWorkingDuration, renderDate } from "./utils";
import { AddItemButton } from "@/components/react/Button/buttons";
import { getTemplateProject } from "../data";
import Projects from "./Projects";

interface Props extends UpdaterProps<EntityType> {
  operation?: ReactNode;
}

export default function Entity({ data, onUpdate, operation }: Props) {
  const [editKey, setEditKey] = useState<keyof EntityType | null>(null);
  const dataRef = useRef(data);
  const [render, setRender] = useState(false);

  const handleEntiryUpdated = (
    name: keyof EntityType,
    value: EntityType[keyof EntityType],
  ) => {
    const newData = { ...data, [name]: value };
    onUpdate(newData);
    dataRef.current = newData;
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.headLeft}>
          {editKey === "name" ? (
            <TextEditor
              value={dataRef.current.name}
              onConfirm={(v) => {
                if (isBlank(v)) {
                  notify("公司或实体名称不能为空", "warn");
                } else {
                  handleEntiryUpdated("name", v);
                }
                setEditKey(null);
              }}
            />
          ) : (
            <TextRenderer
              title="双击修改"
              className={styles.label}
              onDoubleClick={() => setEditKey("name")}
              value={dataRef.current.name}
            />
          )}
        </div>

        <div title={`${getWorkingDuration(dataRef.current)}，（双击修改）`}>
          {editKey === "joiningDate" ? (
            <DateEditor
              value={dataRef.current.joiningDate}
              onConfirm={(v) => {
                if (isBlank(v)) {
                  notify("加入日期不能为空", "warn");
                } else {
                  handleEntiryUpdated("joiningDate", v);
                }
                setEditKey(null);
              }}
              max={dataRef.current.leavingDate}
            />
          ) : (
            <TextRenderer
              title="双击修改"
              className={styles.label}
              onDoubleClick={() => setEditKey("joiningDate")}
              value={renderDate(dataRef.current.joiningDate)}
            />
          )}
          &nbsp;~&nbsp;
          {editKey === "leavingDate" ? (
            <DateEditor
              value={dataRef.current.leavingDate}
              onConfirm={(v) => {
                const isBlk = isBlank(v);
                handleEntiryUpdated("leavingDate", isBlk ? undefined : v);
                setEditKey(null);
              }}
              min={dataRef.current.joiningDate}
            />
          ) : (
            <TextRenderer
              title="双击修改"
              className={styles.label}
              onDoubleClick={() => setEditKey("leavingDate")}
              value={renderDate(dataRef.current.leavingDate)}
            />
          )}
        </div>
        <div className={styles.toolBar}>
          <AddItemButton
            label="添加项目"
            onClick={() => {
              dataRef.current.projects.push(getTemplateProject());
              setRender(!render);
            }}
          />
          {operation}
        </div>
      </div>

      <Projects
        data={dataRef.current.projects}
        onUpdate={(v) => {
          handleEntiryUpdated("projects", v);
        }}
      />
    </div>
  );
}
