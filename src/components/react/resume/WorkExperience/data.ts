export const getTemplateProject = () => {
  return {
    name: "xxx 系统",
    desc: "xxxxxxxx",
    responsibilities: ["负责 xxx 模块"],
  };
};

export const getTemplateEntity = () => {
  return {
    name: "xxx 公司",
    joiningDate: "2025-01-01",
    projects: [getTemplateProject()],
  };
};
