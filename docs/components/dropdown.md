---
title: Dropdown | ZX-Cube
description: Dropdown 组件文档
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

使用 `type` 来定义Alert组件的样式。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 组件的基础用法"></preview>

### Dropdown Attributes

| Name           | Description | Type           | Default |
| -------------- | ----------- | -------------- | ------- |
| menuOptions    | 设置菜单item的属性 | `MenuOption[]` | —       |
| hideAfterClick | 是否隐藏的状态     | `boolean`      | ture    |

### MenuOption Attributes

| Name     | Description     | Type               | Default |
| -------- | --------------- | ------------------ | ------- |
| label    | 设置菜单item的内容（必须） | `string ｜ VNode`   | —       |
| key      | 唯一标识（必须）        | `string \| number` | —       |
| disabled | 是否可用            | `boolean`          | false   |
| divided  | 是否需要分割线         | `boolean`          | false   |
