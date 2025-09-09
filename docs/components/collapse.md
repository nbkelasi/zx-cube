```yaml
title: Collapse | ZX-Cube
description: Collapse 组件文档
```

# Collapse 按钮

常用的折叠面板。

## 基础用法

同时展开多个面板，面板之前互不影响。

<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

### 手风琴模式

每次只能展开一个面板。

通过`accordion`属性来开启手风琴模式。

<preview path="../demo/Collapse/Accordion.vue" title="手风琴模式" description="Collapse 组件的手风琴模式用法"></preview>

### Collapse Attributes

| Name                  | Description | Type                        | Default |
| --------------------- | ----------- | --------------------------- | ------- |
| model-value 或 v-modle | 当前活动面板      | `Array<string \| number>[]` | []      |
| accordion             | 手风琴模式       | `boolean`                   | false   |

### CollapseItem Attributes

| Name     | Description     | Type              | Default |
| -------- | --------------- | ----------------- | ------- |
| name     | 活动面板名称（唯一标识，必填） | `string / number` | —       |
| title    | title描述         | `string`          | —       |
| disabled | 是否可用            | `boolean`         | false   |

### Collapse Slot

| Name    | Description | Children     |
| ------- | ----------- | ------------ |
| default | 自定义默认内容     | CollapseItem |

### CollapseItem Slot

| Name    | Description       |
| ------- | ----------------- |
| default | Collapse item 的内容 |
| title   | Collapse item 的标题 |

### Collapse Events

| Name   | Description | type                        |
| ------ | ----------- | --------------------------- |
| change | 切换面板状态时触发   | `Array<string \| number>[]` |
