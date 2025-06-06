import type { Renderer } from "./types";

export const TextRenderer: Renderer = (props) => {
  const { value, ...rest } = props;
  return <span {...rest}>{value}</span>;
};
