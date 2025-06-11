import { parse } from "./markdownParser";
import type { TagRenderer } from "./markdownParser";
import type { Renderer } from "./types";
import Link from "@/components/react/Link";

export const TextRenderer: Renderer = (props) => {
  const { value, ...rest } = props;
  return <span {...rest}>{value}</span>;
};

const tagRenderer: TagRenderer = {
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

export const MarkdownRenderer: Renderer = (props) => {
  const { value, ...rest } = props;

  return <span {...rest}>{parse(value, tagRenderer)}</span>;
};
