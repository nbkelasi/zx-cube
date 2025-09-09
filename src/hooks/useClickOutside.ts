import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target){
      // 判断是否点击在属性外侧，是则ture
      if(!elementRef.value.contains(e.target as HTMLElement)){
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })
}

export default useClickOutside
