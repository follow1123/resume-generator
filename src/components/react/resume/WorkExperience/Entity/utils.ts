import type { DurationType } from "@/libs/resumeSchema";

export const renderDate = (date?: string): string => {
  if (!date) return "至今";
  return date.substring(0, 7);
};

export const getWorkingDuration = (duration: DurationType): string => {
  const joiningDate = new Date(duration.joiningDate);
  const leavingDate = duration.leavingDate
    ? new Date(duration.leavingDate)
    : new Date();

  const offsetYears = leavingDate.getFullYear() - joiningDate.getFullYear();
  const offsetMonth = leavingDate.getMonth() + 1 - (joiningDate.getMonth() + 1);

  const totalMonth = offsetYears * 12 + offsetMonth;

  const workingYears = Math.floor(totalMonth / 12);
  const workingMohth = totalMonth % 12;
  let content = "在职：";
  if (workingYears) content += `${workingYears}年`;
  if (workingMohth) content += `${workingMohth}月`;

  return content;
};
