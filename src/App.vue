<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
// import Tooltip from "./components/Tooltip/Tooltip.vue";
// import Message from "./components/Message/Message.vue";
// import Input from "./components/Input/Input.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import Alert from "./components/Alert/Alert.vue";
import { createMessage } from './components/Message/method.ts'
import type { ButtonInstance } from "./components/Button/types";
import type { TooltipInstance } from './components/Tooltip/types';
import type { MenuOption } from './components/Dropdown/types';
// 获取组件实例
const buttonRef = ref<ButtonInstance | null>(null);
// Collapse初值
const optionValue = ref(["a"]);
const tooltipRef = ref<TooltipInstance | null>(null)
const open = ()=>{
  if(tooltipRef.value){
    tooltipRef.value.show()
  }
}
const close = ()=>{
  if(tooltipRef.value){
    tooltipRef.value.hide()
  }
}
const megInfo = () => {
  createMessage({message: 'hello message!', type: 'info', duration: 2000, showClose: true},)
}
const megSuccess = () => {
  createMessage({message: 'hello message two!', type: 'success', duration: 2000, showClose: true})
}
const megWarning = () => {
  createMessage({message: 'hello message three!', type: 'warning', duration: 2000, showClose: true})
}
const megError = () => {
  createMessage({message: 'hello message three!', type: 'error', duration: 2000, showClose: true})
}
// Dropdown option
const opentions: MenuOption[] = [
  {key: 1, label: h('b','this is bold')},
  {key: 2, label: 'item2', disabled: true},
  {key: 3, label: 'item3', divided: true},
  {key: 4, label: 'item4'},
]

//测试动态修改icon属性
const size = ref<any>('3x')

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }

  // 动态修改测试
  setTimeout(() => {
    // instance.distory()
    optionValue.value = ['a','b']
    size.value = '2xl'
  }, 2000);
});

</script>

<template>
  <header>
<!--    <Input model-value="" show-password/>-->
    <!-- <Message message="hello message!" show-close :duration="0"></Message> -->
    <Dropdown
    :menu-options="opentions"
    placement="auto"
    trigger="click"
    ref="tooltipRef">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
    </Dropdown>
  </header>
    <Alert title="Unclosable alert" type="success" description="alert DES" :closable="false"></Alert>
    <Alert title="Customized close text" type="info" close-text="Gotcha" />
    <Alert title="Alert with callback" type="warning"/>
    dark
    <Alert title="Unclosable alert" type="success" :closable="false" theme="dark"></Alert>
    <Alert title="Customized close text" type="info" close-text="Gotcha" theme="dark"/>
    <Alert title="Alert with callback" type="warning" theme="dark"/>

  <Icon icon="arrow-up" size="2xl" spin type="danger"></Icon>
  <main>
    <p>形态</p>
    <Button @click="open">Primary</Button>
    <Button plain @click="close">plain</Button>
    <Button round>round</Button>
    <Button circle>circle</Button>
    <Button disabled>disabled</Button>
    <p>样式</p>
    <Button type="primary">primary</Button>
    <Button type="success" @click="megSuccess">mag-success</Button>
    <Button type="info" @click="megInfo">mag-info</Button>
    <Button type="warning" @click="megWarning">mag-warning</Button>
    <Button type="danger" @click="megError">danger-magError</Button>
    <p>朴素样式</p>
    <Button type="primary" plain>primary-plain</Button>
    <Button type="success" plain>success-plain</Button>
    <Button type="info" plain>info-plain</Button>
    <Button type="warning" plain>warning-plain</Button>
    <Button type="danger" plain>danger-plain</Button>
    <p>大小</p>
    <Button size="large">large</Button>
    <Button size="small">small</Button><br />
    <Button size="large" loading>large</Button>
    <Button size="large" icon="arrow-up">large</Button><br />

    <p>Collapse折叠面板</p>
    <Collapse v-model="optionValue" accordion>
      <CollapseItem name="a">
        <template #title>
          <b>this is title A</b>
        </template>
        <h1>headline title</h1>
        <div>this is content</div>
      </CollapseItem>
      <CollapseItem name="b">
        <template #title>
          <b>this is title B</b>
        </template>
        <div>this is bbb title</div>
      </CollapseItem>
      <CollapseItem name="c" disabled>
        <template #title>
          <b>this is title C</b>
        </template>
        <div>this is ccc title</div>
      </CollapseItem>
    </Collapse>
    {{ optionValue }}
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
.zx-alert {
  margin: 20px 0 0;
}
</style>
