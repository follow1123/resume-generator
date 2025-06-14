import type { BasicInfoType } from "@/libs/resumeSchema";

export type InfoKeys = keyof BasicInfoType;
export type ValueType = Required<BasicInfoType>[InfoKeys];

export interface InfoItemOpts {
  label?: string;
  name: string;
  key: InfoKeys;
  value?: ValueType;
  readonly?: boolean;
  parser?: (v: string) => ValueType;
  formatter?: (v: ValueType) => string;
}
