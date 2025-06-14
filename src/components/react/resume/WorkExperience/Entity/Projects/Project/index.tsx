import resumeSty from "@/components/react/resume/styles.module.css";
import type { ProjectType } from "@/libs/resumeSchema";
import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import TechStacks from "./TechStacks";
import Responsibilities from "./Responsibilities";
import type { UpdaterProps } from "@/components/react/resume/types";
import Button from "@/components/react/Button";
import stackUrl from "@/assets/stack.svg?url";
import { TextAreaEditor, TextEditor } from "@/components/react/Editor";
import { MarkdownRenderer, TextRenderer } from "@/components/react/Renderer";
import { classList } from "@/libs/utils";
import { AddItemButton } from "@/components/react/Button/buttons";
import OtherDescriptions from "./OtherDescriptions";
import { isBlank } from "@/libs/stringUtils";
import { notify } from "@/libs/notification";

interface Props extends UpdaterProps<ProjectType> {
  operation?: ReactNode;
}

export default function Project({ data, onUpdate, operation }: Props) {
  const dataRef = useRef(data);
  const [render, setRender] = useState(false);
  const [editKey, setEditKey] = useState<keyof ProjectType | null>(null);
  useEffect(() => {
    dataRef.current = data;
    setRender(!render);
  }, [data]);

  const handleProjectUpdated = (
    name: keyof ProjectType,
    value: ProjectType[keyof ProjectType],
  ) => {
    const newData = { ...data, [name]: value };
    onUpdate(newData);
    dataRef.current = newData;
  };
  return (
    <div className={styles.project}>
      <div className={classList(resumeSty.toolBarContainer, styles.heading)}>
        {editKey === "name" ? (
          <TextEditor
            value={dataRef.current.name}
            onConfirm={(v) => {
              if (isBlank(v)) {
                notify("项目名称不能为空", "warn");
              } else {
                handleProjectUpdated("name", v);
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
        <div className={resumeSty.toolBar}>
          {dataRef.current.techStacks === undefined && (
            <Button
              label="添加项目技术栈"
              iconUrl={stackUrl}
              onClick={() => {
                dataRef.current.techStacks = [""];
                setRender(!render);
              }}
            />
          )}
          <AddItemButton
            label="添加项目描述"
            onClick={() => {
              if (dataRef.current.otherDescriptions === undefined) {
                dataRef.current.otherDescriptions = [];
              }
              dataRef.current.otherDescriptions.push("");
              setRender(!render);
            }}
          />
          {operation}
        </div>
      </div>

      <div>
        <span className={styles.label}>项目描述：</span>
        {editKey === "desc" ? (
          <TextAreaEditor
            className={resumeSty.editor}
            value={dataRef.current.desc}
            onConfirm={(v) => {
              if (isBlank(v)) {
                notify("项目描述不能为空", "warn");
              } else {
                handleProjectUpdated("desc", v);
              }
              setEditKey(null);
            }}
          />
        ) : (
          <MarkdownRenderer
            title="双击修改"
            onDoubleClick={() => setEditKey("desc")}
            value={dataRef.current.desc}
          />
        )}
      </div>
      {dataRef.current.otherDescriptions && (
        <OtherDescriptions
          data={dataRef.current.otherDescriptions}
          onUpdate={(v) => {
            handleProjectUpdated("otherDescriptions", v);
            if (v.length === 0) setRender(!render);
          }}
        />
      )}
      {dataRef.current.techStacks && (
        <TechStacks
          data={dataRef.current.techStacks}
          onUpdate={(v) => {
            const isEmpty = v.length === 0;
            handleProjectUpdated("techStacks", isEmpty ? undefined : v);
            if (isEmpty) setRender(!render);
          }}
        />
      )}
      <Responsibilities
        data={dataRef.current.responsibilities}
        onUpdate={(v) => handleProjectUpdated("responsibilities", v)}
      />
    </div>
  );
}
