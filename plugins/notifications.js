import Vue from 'vue'
import Base from '@/components/ui/notification/base'

export default function ({ app }) {
  const Notification = Vue.extend({ i18n: app.i18n, ...Base })

  const genNotification = options => {
    return new Promise(resolve => {
      const notification = new Notification({
        propsData: options,
        mounted() {
          notification.visible = true
        },
        destroyed: () => {
          document.body.removeChild(notification.$el)
        },
        methods: {
          async confirm() {
            let data = null

            if (notification.actionMethod) {
              notification.loading = true
              data = await notification.actionMethod()
              notification.loading = false
            }

            notification.visible = false
            notification.$destroy()
            resolve(data || true)
          },
          close() {
            notification.visible = false
            notification.$destroy()
            resolve(false)
          },
        },
      })

      document.body.appendChild(notification.$mount().$el)
    })
  }

  Vue.prototype.$success = options => {
    return genNotification({ type: 'success', ...options })
  }
  Vue.prototype.$warning = options => {
    return genNotification({ type: 'warning', ...options })
  }
  Vue.prototype.$error = options => {
    return genNotification({ type: 'error', ...options })
  }
}
