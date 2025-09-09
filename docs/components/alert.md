---
title: Alert | ZX-Cube
description: Alert 组件文档
---

# Alert 提示

用于提示页面中重要的信息。

## 基础用法

使用 `type` 来定义Alert组件的样式。

<preview path="../demo/Alert/Basic.vue" title="基础用法" description="Alert 组件的基础用法"></preview>

### Alert Attributes

| Name        | Description | Type                                                             | Default |
| ----------- | ----------- | ---------------------------------------------------------------- | ------- |
| type        | Alert 类型    | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | info    |
| theme       | Alert 主题    | `enum`-`'light'\|'dark'`                                         | light   |
| title       | Alert 标题    | `string`                                                         | —       |
| description | Alert 描述    | `string`                                                         | —       |
| closable    | 是否可以关闭      | `boolean`                                                        | ture    |
| closeText   | 自定义关闭按钮文本   | `string`                                                         | —       |
