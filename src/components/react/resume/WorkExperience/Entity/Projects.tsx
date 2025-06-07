import type { ProjectsType } from "@/libs/resumeSchema";
import type { UpdaterProps } from "../../types";
import styles from "./styles.module.css";

import { useState } from "react";
import Project from "./Project";

export default function Projects({
  data,
  onUpdate,
}: UpdaterProps<ProjectsType>) {
  const [projects, setProjects] = useState(data || ([] as ProjectsType));
  return (
    <div className={styles.projects}>
      {projects.map((p, idx) => (
        <Project
          key={`${p.name}-${idx}`}
          index={idx}
          list={projects}
          onUpdate={(list) => {
            onUpdate(list);
            setProjects(list);
          }}
        />
      ))}
    </div>
  );
}
