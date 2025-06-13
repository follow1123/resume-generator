import type { HTMLAttributes } from "react";
import { parse } from "./markdownParser";
import type { TagBuilder } from "./markdownParser";
import Link from "../Link";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  value: string;
}

export function TextRenderer({ value, ...rest }: TextProps) {
  return <span {...rest}>{value}</span>;
}

const tagRenderer: TagBuilder = {
  strong: (text) => {
    const content = text.slice(2, text.length - 2);
    return <strong key={content}>{content}</strong>;
  },
  a: (text) => {
    const contents = text.split("](");
    const label = contents[0].slice(1);
    const url = contents[1].slice(0, contents[1].length - 1);
    return <Link key={url} label={label} url={url} />;
  },
};

export function MarkdownRenderer({ value, ...rest }: TextProps) {
  return <span {...rest}>{parse(value, tagRenderer)}</span>;
}
