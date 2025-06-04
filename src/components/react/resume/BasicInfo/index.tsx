import styles from "./styles.module.css";
import PopoverButton from "@/components/react/PopoverButton";
import type { Option } from "@/components/react/PopoverButton";
import Section from "../Section";
import Item from "./Item";
import addUrl from "@/assets/add.svg?url";
import List from "@/components/react/List";

import { BasicInfoSchema } from "@/libs/resumeSchema";
import type { BasicInfoType } from "@/libs/resumeSchema";
import { useEffect, useState } from "react";
import { z } from "zod/v4";
import { notify } from "@/libs/notification";
import type { InfoItem } from "./types";

const basicInfoItems: InfoItem[] = [
  {
    order: 0,
    label: "姓&emsp;&emsp;名",
    text: "姓名",
    key: "name",
    fixed: true,
  },
  {
    order: 1,
    label: "年&emsp;&emsp;龄",
    text: "年龄",
    key: "age",
    fixed: true,
    parser: (v) =>
      z.coerce
        .number("年龄必须为数字")
        .pipe(BasicInfoSchema.shape.age)
        .parse(v),
    formatter: (v) => `${v}岁`,
  },
  {
    order: 2,
    label: "性&emsp;&emsp;别",
    text: "性别",
    key: "gender",
    fixed: true,
  },
  {
    order: 3,
    text: "工作年限",
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
      let text = `${year}年`;
      if (Math.ceil(workingYears) > workingYears) text += "半";
      return text;
    },
  },
  {
    order: 4,
    label: "电&emsp;&emsp;话",
    text: "电话",
    key: "phone",
  },
  {
    order: 5,
    label: "邮&emsp;&emsp;箱",
    text: "邮箱",
    key: "mailbox",
    parser: (v) => BasicInfoSchema.required().shape.mailbox.parse(v),
  },
];

const getInfoItems = (data: BasicInfoType): InfoItem[] => {
  return basicInfoItems.map((i) => ({
    ...i,
    value: data[i.key],
  }));
};

export default function BasicInfo({ data }: { data: BasicInfoType }) {
  const [infoItems, setInfoItems] = useState(getInfoItems(data));

  useEffect(() => {
    setInfoItems(getInfoItems(data));
  }, [data]);

  const handleAdd = (key: string) => {
    if (key === "") {
      notify({
        type: "info",
        text: "没有可以添加的信息",
      });
      return;
    }
    const newData = [...infoItems];
    const item = basicInfoItems.find((i) => i.key === key);
    if (!item) {
      console.error("invalid item key: ", key);
      return;
    }
    newData.splice(item.order, 0, { ...item });
    setInfoItems(newData);
  };

  const itemList: Option[] = basicInfoItems
    .filter((l) => !l.fixed && !infoItems.find((i) => i.key === l.key))
    .map((l) => ({
      name: l.text,
      value: l.key,
    }));

  return (
    <Section
      title="基本信息"
      operation={
        <PopoverButton
          position="bottom-right"
          label="添加"
          iconUrl={addUrl}
          list={itemList}
          onSelected={handleAdd}
        />
      }
    >
      <List
        styleVisible={false}
        className={styles.basicInfo}
        itemClassName={styles.item}
        items={infoItems.map((l, i) => ({
          key: l.key,
          item: (
            <Item
              index={i}
              list={infoItems}
              onUpdate={(list) => {
                setInfoItems(list);
              }}
            />
          ),
        }))}
      />
    </Section>
  );
}
