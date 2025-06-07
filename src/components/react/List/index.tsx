import styles from "./styles.module.css";
type ListType = "ordered" | "unordered";

interface ItemType {
  key: React.Key;
  item: React.ReactNode;
}

interface Props {
  className?: string;
  itemClassName?: string;
  type?: ListType;
  styleVisible?: boolean;
  indent?: number;
  items: ItemType[];
}

export default function List({
  className,
  itemClassName,
  type = "unordered",
  styleVisible = true,
  indent = 0,
  items,
}: Props) {
  if (styleVisible) indent += 1;

  const listClassList = [styles.list];
  if (className) listClassList.push(className);
  if (!styleVisible) listClassList.push(styles.hideListStyle);
  const listItemClassList = [styles.listItem];
  if (itemClassName) listItemClassList.push(itemClassName);

  const listItems = items.map((i) => (
    <li key={i.key} className={listItemClassList.join(" ")}>
      {i.item}
    </li>
  ));

  const listStyle = { paddingLeft: indent === 0 ? "unset" : `${indent}em` };

  return (
    <>
      {type === "ordered" ? (
        <ol
          className={listClassList.join(" ")}
          style={listStyle}
          children={listItems}
        />
      ) : (
        <ul
          className={listClassList.join(" ")}
          style={listStyle}
          children={listItems}
        />
      )}
    </>
  );
}
