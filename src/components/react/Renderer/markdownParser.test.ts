import { expect, describe, it } from "vitest";
import { parse, type TagBuilder } from "./markdownParser";

const tagRenderer: TagBuilder = {
  strong: (text) => {
    console.log("text:", text);

    const content = text.slice(2, text.length - 2);
    if (content === "") return text;
    return `<strong>${content}</strong>`;
  },
  a: (text) => {
    const contents = text.split("](");
    const label = contents[0].slice(1);
    const url = contents[1].slice(0, contents[1].length - 1);
    return `<a href="${url}">${label}</a>`;
  },
};

describe("parser", () => {
  it("normal text", () => {
    expect(parse("aaa", tagRenderer)).toStrictEqual(["aaa"]);
  });
  it("bold text", () => {
    expect(parse("aaa **bbb**", tagRenderer)).toStrictEqual([
      "aaa ",
      "<strong>bbb</strong>",
    ]);
    expect(parse("aaa **bbb**, ccc", tagRenderer)).toStrictEqual([
      "aaa ",
      "<strong>bbb</strong>",
      ", ccc",
    ]);
    expect(parse("aaa **bbb***", tagRenderer)).toStrictEqual([
      "aaa ",
      "<strong>bbb</strong>",
      "*",
    ]);
    expect(parse("aaa ***bbb**", tagRenderer)).toStrictEqual([
      "aaa ",
      "<strong>*bbb</strong>",
    ]);
    expect(parse("aaa ***bbb***", tagRenderer)).toStrictEqual([
      "aaa ",
      "<strong>*bbb</strong>",
      "*",
    ]);
    expect(parse("aaa ****bbb****", tagRenderer)).toStrictEqual([
      "aaa ",
      "****",
      "bbb",
      "****",
    ]);
    expect(parse("aaa **bbb*", tagRenderer)).toStrictEqual(["aaa ", "**bbb*"]);
    expect(parse("aaa **bbb", tagRenderer)).toStrictEqual(["aaa ", "**bbb"]);
    expect(parse("aaa *******bbb**", tagRenderer)).toStrictEqual([
      "aaa ",
      "****",
      "<strong>*bbb</strong>",
    ]);
  });
  it("anchor text", () => {
    expect(parse("aaa [bbb](ccc)", tagRenderer)).toStrictEqual([
      "aaa ",
      '<a href="ccc">bbb</a>',
    ]);
    expect(parse("aaa [bbb](ccc), ccc", tagRenderer)).toStrictEqual([
      "aaa ",
      '<a href="ccc">bbb</a>',
      ", ccc",
    ]);
    expect(parse("aaa [bbb]ccc)", tagRenderer)).toStrictEqual([
      "aaa ",
      "[bbb]ccc)",
    ]);
    expect(parse("aaa [bbb(ccc)", tagRenderer)).toStrictEqual([
      "aaa ",
      "[bbb(ccc)",
    ]);
    expect(parse("aaa [bbb](ccc", tagRenderer)).toStrictEqual([
      "aaa ",
      "[bbb](ccc",
    ]);
    expect(parse("aaa [bbb](ccc", tagRenderer)).toStrictEqual([
      "aaa ",
      "[bbb](ccc",
    ]);
    expect(parse("aaa [[bbb](ccc)", tagRenderer)).toStrictEqual([
      "aaa ",
      '<a href="ccc">[bbb</a>',
    ]);
    expect(parse("aaa [](ccc)", tagRenderer)).toStrictEqual([
      "aaa ",
      '<a href="ccc"></a>',
    ]);
  });

  it("bold and anchor text", () => {
    expect(parse("**aaa: **[bbb](ccc)", tagRenderer)).toStrictEqual([
      "<strong>aaa: </strong>",
      '<a href="ccc">bbb</a>',
    ]);
  });
});
