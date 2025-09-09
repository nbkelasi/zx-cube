import { describe, expect, test, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
vi.mock('@popperjs/core')
const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() =>
      <div id='outside'>
        <Tooltip content='hello tooltip' placement="auto" trigger="click" onVisible-change={onVisibleChange}>
          <button id='trigger'>Trigger</button>
        </Tooltip>
      </div>
      , {
        attachTo: document.body
      })
      // 静态测试
      const triggerArea = wrapper.find('#trigger')
      expect(triggerArea.exists()).toBeTruthy()
      expect(wrapper.find('.zx-tooltip__popper').exists()).toBeFalsy()
      console.log('before',wrapper.html());

      // 行为测试
      triggerArea.trigger('click')
      await vi.runAllTimers()
      expect(wrapper.find('.zx-tooltip__popper').exists()).toBeTruthy()
      expect(wrapper.find('.zx-tooltip__popper').text()).toBe('hello tooltip')
      expect(onVisibleChange).toHaveBeenCalledWith(true)
      console.log('after',wrapper.html());
      // 模拟外侧点击
      wrapper.get('#outside').trigger('click')
      await vi.runAllTimers()
      expect(wrapper.find('.zx-tooltip__popper').exists()).toBeFalsy()
      expect(onVisibleChange).toHaveBeenLastCalledWith(false)

  })
})
