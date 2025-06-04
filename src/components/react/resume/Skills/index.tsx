import Section from "../Section";
import type { SkillsType } from "@/libs/resumeSchema";
import { useEffect, useState } from "react";
import Item from "./Item";
import Button from "@/components/react/Button";
import addUrl from "@/assets/add.svg?url";
import List from "@/components/react/List";

export default function Skills({ data }: { data: SkillsType }) {
  const [skills, setSkills] = useState(data);
  useEffect(() => {
    setSkills(data);
  }, [data]);

  return (
    <Section
      title="技能特长"
      operation={
        <Button
          label="添加"
          iconUrl={addUrl}
          onClick={() => {
            // @ts-ignore
            setSkills([...skills, undefined]);
          }}
        />
      }
    >
      <List
        items={skills?.map((skill, i) => ({
          key: `${skill}-${i}`,
          item: (
            <Item
              list={skills}
              index={i}
              onUpdate={(list) => {
                setSkills(list);
              }}
            />
          ),
        }))}
      />
    </Section>
  );
}
