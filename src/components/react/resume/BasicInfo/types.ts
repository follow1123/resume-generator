import type { BasicInfoType } from "@/libs/resumeSchema";

export type InfoKeys = keyof BasicInfoType;
export type ValueType = Required<BasicInfoType>[InfoKeys];

export interface InfoItem {
  order: number;
  label?: string;
  text: string;
  key: InfoKeys;
  value?: ValueType;
  fixed?: boolean;
  parser?: (v: string) => Required<BasicInfoType>[InfoKeys];
  formatter?: (v: Required<BasicInfoType>[InfoKeys]) => string;
}
