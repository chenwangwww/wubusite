// directives/clickOutside.js
export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      // 判断点击是否发生在 el 外部
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event) // 执行绑定的方法
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
