import styles from "./styles.module.css";
import {
  addResume,
  getCurrentResumeName,
  getResumeList,
  isDuplicate,
  removeResume,
  setCurrentResume,
  subscribeResume,
} from "@/libs/resumeStore";
import { useEffect, useState } from "react";
import { classList, randomName } from "@/libs/utils";
import { AddButton, RemoveButton } from "@/components/react/Button/buttons";
import templateResume from "@/assets/template.json?raw";
import { ResumeSchema } from "@/libs/resumeSchema";

interface NavLink {
  name: string;
  current?: boolean;
}
const randomTemplateName = (): string => {
  return randomName("template");
};

const getLinks = (): NavLink[] => {
  const currentName = getCurrentResumeName();
  let hasCurrent = false;
  const links = getResumeList().map((r) => {
    const isCurrent = currentName === r.name;
    if (isCurrent) {
      hasCurrent = true;
    }
    return { name: r.name, current: isCurrent };
  });

  if (links.length > 0 && !hasCurrent) {
    links[0].current = true;
    setCurrentResume(links[0].name);
  }
  return links;
};

export default function ResumeNavigator() {
  const [links, setLinks] = useState<NavLink[] | undefined>(undefined);
  useEffect(() => {
    setLinks(getLinks());
    return subscribeResume(() => {
      setLinks(getLinks());
    });
  }, []);

  const handleAdd = () => {
    const result = ResumeSchema.safeParse(JSON.parse(templateResume));
    if (!result.success) {
      console.error("导入模板简历错误");
      console.error(result.error);
      return;
    }
    if (result.data) {
      const resume = result.data;
      let templateName = randomTemplateName();
      let times = 5;
      while (times > 0 && isDuplicate(templateName)) {
        console.log("重新生成模板简历名称");

        templateName = randomTemplateName();
        times--;
      }
      if (isDuplicate(templateName)) {
        alert("模板简历添加失败，重新手动添加");
        console.error("模板简历添加失败，重新手动添加");
        return;
      }
      resume.name = templateName;
      addResume(resume);
    }
  };

  return (
    <div className={styles.links}>
      {links?.map((l) => (
        <div className={styles.container} key={l.name}>
          <span
            className={classList(
              styles.link,
              l.current ? styles.currentLink : undefined,
            )}
            onClick={() => setCurrentResume(l.name)}
          >
            {l.name}
          </span>
          <RemoveButton
            className={styles.button}
            onClick={() => removeResume(l.name)}
          />
        </div>
      ))}
      <AddButton
        label="添加模板简历"
        className={styles.addButton}
        onClick={() => handleAdd()}
      />
    </div>
  );
}
