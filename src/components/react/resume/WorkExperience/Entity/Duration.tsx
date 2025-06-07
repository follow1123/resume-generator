import type { UpdaterProps } from "@/components/react/resume/types";
import RtInput from "@/components/react/RtInput";
import { notify } from "@/libs/notification";
import type { DurationType } from "@/libs/resumeSchema";
import { isBlank } from "@/libs/stringUtils";
import { useRef, useState } from "react";

const renderDate = (date?: string): string => {
  if (!date) return "至今";
  return date.substring(0, 7);
};

const getWorkingDuration = (duration: DurationType): string => {
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

function JoiningDate(props: UpdaterProps<string> & { max?: string }) {
  const [edit, setEdit] = useState(props.data === undefined);
  const dataRef = useRef(props.data);

  const handleConfirm = (v: string) => {
    if (isBlank(v)) {
      notify({
        type: "warn",
        text: "加入日期不能为空",
      });
      return;
    }
    if (dataRef.current !== v) {
      dataRef.current = v;
      props.onUpdate(v);
    }
    setEdit(false);
  };

  return (
    <RtInput
      editorType="date"
      editorProps={{
        onConfirm: handleConfirm,
        max: props.max,
      }}
      rendererProps={{
        onDoubleClick: () => setEdit(true),
      }}
      editing={edit}
      value={edit ? dataRef.current : renderDate(dataRef.current)}
    />
  );
}

function LeavingDate(props: UpdaterProps<string> & { min?: string }) {
  const [edit, setEdit] = useState(false);
  const dataRef = useRef(props.data);

  const handleConfirm = (v: string) => {
    if (isBlank(v)) {
      dataRef.current = undefined;
      // @ts-ignore
      props.onUpdate(dataRef.current);
      setEdit(false);
      return;
    }
    if (dataRef.current !== v) {
      dataRef.current = v;
      props.onUpdate(v);
    }
    setEdit(false);
  };

  return (
    <RtInput
      editorType="date"
      editorProps={{
        onConfirm: handleConfirm,
        min: props.min,
      }}
      rendererProps={{
        onDoubleClick: () => setEdit(true),
      }}
      editing={edit}
      value={edit ? dataRef.current : renderDate(dataRef.current)}
    />
  );
}
export default function Duration({
  data,
  onUpdate,
}: UpdaterProps<DurationType>) {
  const dataRef = useRef(data as DurationType);

  return (
    <div title={`${getWorkingDuration(dataRef.current)}，（双击修改）`}>
      <JoiningDate
        data={dataRef.current.joiningDate}
        onUpdate={(v) => {
          dataRef.current.joiningDate = v;
          onUpdate(dataRef.current);
        }}
        max={dataRef.current.leavingDate}
      />
      &nbsp;~&nbsp;
      <LeavingDate
        data={dataRef.current.leavingDate}
        onUpdate={(v) => {
          dataRef.current.joiningDate = v;
          onUpdate(dataRef.current);
        }}
        min={dataRef.current.joiningDate}
      />
    </div>
  );
}
