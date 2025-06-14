import Button from "./index";
import type { Props as ButtonProps } from "./types";

import addUrl from "@/assets/add.svg?url";
import upUrl from "@/assets/up.svg?url";
import downUrl from "@/assets/down.svg?url";
import removeUrl from "@/assets/remove.svg?url";
import addItemUrl from "@/assets/addItem.svg?url";

interface Props extends Omit<ButtonProps, "label"> {
  label?: string;
}

export function AddButton({
  label = "添加",
  iconUrl = addUrl,
  ...rest
}: Props) {
  const buttonProps = {
    label,
    iconUrl,
    ...rest,
  };
  return <Button {...buttonProps} />;
}

export function MoveUpButton({
  label = "上移",
  iconUrl = upUrl,
  ...rest
}: Props) {
  const buttonProps = {
    label,
    iconUrl,
    ...rest,
  };
  return <Button {...buttonProps} />;
}

export function MoveDownButton({
  label = "下移",
  iconUrl = downUrl,
  ...rest
}: Props) {
  const buttonProps = {
    label,
    iconUrl,
    ...rest,
  };
  return <Button {...buttonProps} />;
}

export function RemoveButton({
  label = "删除",
  iconUrl = removeUrl,
  ...rest
}: Props) {
  const buttonProps = {
    label,
    iconUrl,
    ...rest,
  };
  return <Button {...buttonProps} />;
}

export function AddItemButton({
  label = "添加项",
  iconUrl = addItemUrl,
  ...rest
}: Props) {
  const buttonProps = {
    label,
    iconUrl,
    ...rest,
  };
  return <Button {...buttonProps} />;
}
