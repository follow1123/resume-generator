import styles from "./styles.module.css";
import Section from "../Section";
import type { ExperiencesType } from "@/libs/resumeSchema";
import Entity from "./Entity";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/react/Button";
import addUrl from "@/assets/add.svg?url";

export default function WorkExperience({ data }: { data?: ExperiencesType }) {
  const [render, setRender] = useState(false);
  const dataRef = useRef(data || ([] as ExperiencesType));

  useEffect(() => {
    dataRef.current = data || ([] as ExperiencesType);
    setRender(!render);
  }, [data]);

  const handAddExperience = () => {
    const newData = [
      ...dataRef.current,
      {
        name: "xxx 公司",
        joiningDate: "2025-01-01",
        projects: [
          {
            name: "xxx 系统",
            desc: "xxxxxxxx",
            responsibilities: ["负责 xxx 模块"],
          },
        ],
      },
    ];
    dataRef.current = newData;
    setRender(!render);
  };

  return (
    <Section
      title="工作经历"
      operation={
        <Button label="添加" iconUrl={addUrl} onClick={handAddExperience} />
      }
    >
      <div className={styles.experiences}>
        {dataRef.current.map((exp, idx) => (
          <Entity
            key={exp.name}
            index={idx}
            list={dataRef.current}
            onUpdate={(list) => (dataRef.current = list)}
          />
        ))}
      </div>
    </Section>
  );
}
