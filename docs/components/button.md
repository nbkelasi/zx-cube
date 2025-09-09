---
title: Button | ZX-Cube
description: Button 组件文档
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

### 图标按钮

使用`icon`来添加按钮的图标。

<preview path="../demo/Button/Icon.vue" title="图标按钮" description="Button 组件添加图标"></preview>

### Button Attributes

| Name        | Description     | Type                                                             | Default |
| ----------- | --------------- | ---------------------------------------------------------------- | ------- |
| size        | 按钮大小            | `enum` - `'large'\| 'small'`                                     | —       |
| type        | 按钮类型            | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain       | 是否为朴素样式         | `boolean`                                                        | false   |
| round       | 是否为圆角样式         | `boolean`                                                        | false   |
| circle      | 是否为圆形样式         | `boolean`                                                        | false   |
| loading     | 是否为加载中状态        | `boolean`                                                        | false   |
| disabled    | 是否为不可用状态        | `boolean`                                                        | false   |
| icon        | icon 组件         | `string`                                                         | —       |
| autofocus   | 原生`autofocus`属性 | `boolean`                                                        | false   |
| native-type | 原生`type`属性      | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |

### Button Expose

| Name | Description | Type     |
| ---- | ----------- | -------- |
| ref  | 按钮的html实例   | `object` |
