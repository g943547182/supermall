import Toast from "@/components/common/toast/Toast";

const obj = {}

obj.install = function (Vue) {

  // document.body.appendChild(Toast.$el)
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式根据组件构造器可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.手动挂载
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
