import type { ReactNode } from "react";

type State =
  | "NORMAL"
  | "BOLD_START"
  | "BOLD_CONTENT"
  | "BOLD_END"
  | "ANCHOR_LABEL"
  | "ANCHOR_MIDDLE"
  | "ANCHOR_URL";

export type SupportedTag = "strong" | "a";

interface BoldRange {
  name: "strong";
  start: number;
  end?: number;
}

interface AnchorRange {
  name: "a";
  start: number;
  middle?: number;
  end?: number;
}

type TagRange = BoldRange | AnchorRange;

export const isComplete = (tag: TagRange): boolean => {
  switch (tag.name) {
    case "strong":
      return tag.end !== undefined;
    case "a":
      return tag.middle !== undefined && tag.end !== undefined;
    default:
      throw new Error(`unsupported tag`);
  }
};

export type TagBuilder = Record<SupportedTag, (text: string) => ReactNode>;

export const parse = (input: string, tagBuilder: TagBuilder): ReactNode[] => {
  const nodes: ReactNode[] = [""]; // 存储最终的输出结果
  let nodeIdx = 0;
  let state: State = "NORMAL"; // 初始状态：普通文本状态
  let range: TagRange | undefined = undefined;

  let i = 0;
  while (i < input.length) {
    let char = input[i];

    switch (state) {
      case "NORMAL":
        if (char === "*") {
          state = "BOLD_START";
          if (nodes[nodeIdx]) nodeIdx++;
        }
        if (char === "[") {
          state = "ANCHOR_LABEL";
          if (nodes[nodeIdx]) nodeIdx++;
          range = { name: "a", start: i };
        }
        break;
      case "BOLD_START":
        if (char === "*") {
          state = "BOLD_CONTENT";
          range = { name: "strong", start: i };
        } else {
          state = "NORMAL";
        }
        break;
      case "BOLD_CONTENT":
        if (char === "*") {
          state = "BOLD_END";
        } else {
        }
        break;
      case "BOLD_END":
        if (char === "*") {
          if (range) {
            range.end = i;
          }
          state = "NORMAL";
        } else {
          state = "BOLD_CONTENT";
        }
        break;
      case "ANCHOR_LABEL":
        if (char === "]") {
          state = "ANCHOR_MIDDLE";
        }
        break;
      case "ANCHOR_MIDDLE":
        if (char === "(") {
          state = "ANCHOR_URL";
          if (range) {
            (range as AnchorRange).middle = i;
          }
        } else {
          range = undefined;
        }
        break;
      case "ANCHOR_URL":
        if (char === ")") {
          state = "NORMAL";
          if (range) {
            range.end = i;
          }
        }
        break;
    }

    nodes[nodeIdx] = nodes[nodeIdx] ? nodes[nodeIdx] + char : char;
    if (range && isComplete(range)) {
      nodes[nodeIdx] = tagBuilder[range.name](nodes[nodeIdx] as string);
      range = undefined;
      nodeIdx++;
    }
    i++;
  }
  return nodes;
};
