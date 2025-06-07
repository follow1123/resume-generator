import BasicInfo from "./BasicInfo";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import { resumeStore } from "@/libs/resumeStore";
import { StrictMode, useEffect, useState } from "react";

function ResumeNotFound({ message }: { message: string }) {
  return <p style={{ color: "red" }}>{message}</p>;
}

function Resume() {
  const [name, setName] = useState(resumeStore.getState().context.current);

  useEffect(() => {
    return resumeStore.subscribe(
      (state) => state.context.current,
      (current) => {
        console.log("switching resume: ", current);

        setName(current);
      },
    );
  }, []);

  if (!name) {
    return <ResumeNotFound message="没有选中的简历" />;
  }
  const resume = resumeStore.getState().getResume(name);
  if (!resume) {
    return <ResumeNotFound message={`没有名称为：'${name} 的简历'`} />;
  }

  return (
    <>
      <BasicInfo data={resume.basic} />
      <Skills data={resume.skills} />
      <WorkExperience data={resume.experiences} />
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
