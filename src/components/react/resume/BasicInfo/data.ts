import { BasicInfoSchema, type BasicInfoType } from "@/libs/resumeSchema";
import type { InfoItemOpts, InfoKeys, ValueType } from "./types";
import { ZodError, z } from "zod/v4";
import { notify } from "@/libs/notification";

export class Info {
  static defaultParser: (v: string) => ValueType = (v) => v;
  static defaultFormatter: (v: ValueType) => string = (v) => String(v);

  label: string;
  name: string;
  key: InfoKeys;
  value?: ValueType;
  parser: (v: string) => Required<BasicInfoType>[InfoKeys];
  formatter: (v: Required<BasicInfoType>[InfoKeys]) => string;

  readonly: boolean;

  constructor(opts: InfoItemOpts) {
    this.name = opts.name;
    this.label = opts.label || opts.name;
    this.key = opts.key;
    this.parser = opts.parser || Info.defaultParser;
    this.formatter = opts.formatter || Info.defaultFormatter;

    this.readonly = opts.readonly || false;
  }

  getValue(format?: boolean): string {
    if (this.value === undefined) {
      throw new Error("value is null");
    }
    if (format) {
      return this.formatter(this.value);
    } else {
      return Info.defaultFormatter(this.value);
    }
  }

  setValue(v: string): boolean {
    try {
      this.value = this.parser(v);
      return true;
    } catch (e) {
      if (e instanceof ZodError) {
        notify(z.prettifyError(e), "error");
      }
      console.error(e);
      return false;
    }
  }

  parse(v: string): Required<BasicInfoType>[InfoKeys] {
    return this.parser(v);
  }

  format(): string {
    if (this.value) {
      return this.formatter(this.value);
    }
    return "";
  }
}

const infoList = [
  new Info({
    label: "姓&emsp;&emsp;名",
    name: "姓名",
    key: "name",
    readonly: true,
  }),
  new Info({
    label: "性&emsp;&emsp;别",
    name: "性别",
    key: "gender",
    readonly: true,
  }),
  new Info({
    label: "年&emsp;&emsp;龄",
    name: "年龄",
    key: "age",
    readonly: true,
    parser: (v) =>
      z.coerce
        .number("年龄必须为数字")
        .pipe(BasicInfoSchema.shape.age)
        .parse(v),
    formatter: (v) => `${v}岁`,
  }),
  new Info({
    name: "工作年限",
    key: "workingYears",
    parser: (v) =>
      z.coerce
        .number("工作年限必须为数字")
        .pipe(BasicInfoSchema.required().shape.workingYears)
        .parse(v),
    formatter: (v) => {
      const workingYears = v as number;
      const year = Math.floor(workingYears);
      if (year < 1) return "半年";
      let name = `${year}年`;
      if (Math.ceil(workingYears) > workingYears) name += "半";
      return name;
    },
  }),
  new Info({
    label: "电&emsp;&emsp;话",
    name: "电话",
    key: "phone",
  }),
  new Info({
    label: "邮&emsp;&emsp;箱",
    name: "邮箱",
    key: "mailbox",
    parser: (v) => BasicInfoSchema.required().shape.mailbox.parse(v),
  }),
];

export const getInfoList = (data: BasicInfoType): Info[] => {
  infoList.forEach((info) => {
    if (data[info.key] !== undefined) {
      info.value = data[info.key];
    }
  });
  return infoList;
};

export const toBasicInfo = (dataList: Info[]): BasicInfoType => {
  const basicInfo = {} as BasicInfoType;
  dataList
    .filter((d) => d.value)
    .forEach((d) => {
      // @ts-ignore
      basicInfo[d.key] = d.value;
    });
  return basicInfo;
};
