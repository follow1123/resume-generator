import Section from "../Section";
import type { AdditionalItemsType } from "@/libs/resumeSchema";
import { useEffect, useState } from "react";

import Item from "./Item";

import Button from "@/components/react/Button";
import addUrl from "@/assets/add.svg?url";
import List from "@/components/react/List";

export default function AdditionalInfo({
  data,
}: {
  data: AdditionalItemsType;
}) {
  const [additionalItems, setAdditionalItems] = useState(data);
  useEffect(() => {
    setAdditionalItems(data);
  }, [data]);

  return (
    <Section
      title="其他信息"
      operation={
        <Button
          label="添加"
          iconUrl={addUrl}
          onClick={() => {
            // @ts-ignore
            setAdditionalItems([...additionalItems, undefined]);
          }}
        />
      }
    >
      <List
        items={additionalItems.map((a, i) => ({
          key: `${a}-${i}`,
          item: (
            <Item
              list={additionalItems}
              index={i}
              onUpdate={(list) => {
                setAdditionalItems(list);
              }}
            />
          ),
        }))}
      />
    </Section>
  );
}
