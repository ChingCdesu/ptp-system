<template>
  <n-layout-sider
    :bordered="true"
    :collapsed="collapsed"
    collapse-mode="width"
    :collapsed-width="84"
    :width="272"
    show-trigger
    :native-scrollbar="false"
    :content-style="{ padding: '6px 12px' }"
    @collapse="() => { collapsed = true }"
    @expand="() => { collapsed = false }"
  >
    <n-layout class="sider-content" :style="{ backgroundColor: 'transparent' }">
      <n-menu
        :show-rail="false"
        :collapsed="collapsed"
        :collapsed-width="60"
        :options="modules"
        v-model:value="activeModule"
        @update:value="handleMenuItemClicked"
      ></n-menu>
    </n-layout>
  </n-layout-sider>
</template>

<script lang="ts">
import { computed, defineComponent, h, Ref, ref } from 'vue'
import { NMenu, NLayout, NLayoutSider, useLoadingBar, useMessage } from 'naive-ui'
import store from '@/store'
import router from '@/router'
import IonIcon from './IonIcon.vue'
import i18n from '@/i18n'

export default defineComponent({
  name: 'Navigation',
  components: {
    NMenu,
    NLayout,
    NLayoutSider,
    IonIcon
  },
  setup() {
    const message = useMessage()
    const loadingBar = useLoadingBar()
    const collapsed = ref(false)
    const activeModule: Ref<any> = ref(router.currentRoute.value.name)

    const handleMenuItemClicked = (key: any) => {
      loadingBar?.start()
      if (router.hasRoute(key)) {
        router.push({ name: key })
          .then(() => {
            loadingBar?.finish()
          })
          .catch(error => {
            message.error(error)
            loadingBar?.error()
          })
      } else {
        message.warning(i18n.global.t('tips.module_not_found'))
        loadingBar?.error()
      }
    }
    return {
      collapsed,
      activeModule,
      handleMenuItemClicked
    }
  },
  computed: {
    modules() {
      return store.state.navigations.map(item => ({
        label: computed(() => this.$t(`${item.name}.title`)).value,
        key: item.name,
        icon: () => h('ion-icon', { size: '40px', name: item.icon })
      }))
    }
  }
})
</script>
