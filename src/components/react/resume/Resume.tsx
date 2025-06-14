import BasicInfo from "./BasicInfo";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import AdditionalInfo from "./AdditionalInfo";
import {
  getCurrentResumeName,
  getResume,
  setResumeSection,
  subscribeResume,
} from "@/libs/resumeStore";
import { StrictMode, useEffect, useState } from "react";

function ResumeNotFound({ message }: { message: string }) {
  return <p>{message}</p>;
}

function Resume() {
  const [name, setName] = useState(getCurrentResumeName());

  useEffect(() => {
    return subscribeResume(
      (state) => state.context.current,
      (current) => {
        setName(current);
      },
    );
  }, []);

  if (!name) {
    return (
      <ResumeNotFound message="没有简历，添加（左上角）或导入（右上角）简历" />
    );
  }
  const resume = getResume(name);
  if (!resume) {
    return <ResumeNotFound message={`没有名称为：'${name}' 的简历`} />;
  }

  return (
    <>
      <BasicInfo
        data={resume.basic}
        onUpdate={(v) => setResumeSection(name, "basic", v)}
      />
      <Skills
        data={resume.skills}
        onUpdate={(v) => setResumeSection(name, "skills", v)}
      />
      <WorkExperience
        data={resume.experiences}
        onUpdate={(v) => setResumeSection(name, "experiences", v)}
      />
      <AdditionalInfo
        data={resume.additionalItems}
        onUpdate={(v) => setResumeSection(name, "additionalItems", v)}
      />
    </>
  );
}

export default function ResumeStrictMode() {
  return (
    <StrictMode>
      <Resume />
    </StrictMode>
  );
}
