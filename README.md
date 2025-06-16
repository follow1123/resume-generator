## 简历生成器

在线生成简历

地址：[resume-generator](https://follow1123.github.io/resume-generator/)

### 特性

- 支持 Markdown 的**加粗**、[链接]()语法
- 使用浏览器原始打印 API

### 开发

- `pnpm dev` - 开发模式启动项目
- `pnpm build` - 构建项目
- `pnpm preview` - 运行build目录下已经构建的项目
- `pnpm test` - 测试

### 部署

指定网站 url 和 basename

```bash
pnpm build --site <your_site> --base <your_basename>
```
