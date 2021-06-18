<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :date-locale="dateLocale"
    :locale="locale"
  >
    <n-layout
      class="page main-layout"
      :content-style="{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }"
    >
      <n-layout-header class="layout-header" :bordered="true">
        <n-space class="layout-header__left">
          <n-avatar size="medium" :src="logo_2x"></n-avatar>
          <n-text>{{ $t('appName') }}</n-text>
        </n-space>
        <n-space class="layout-header__right" align="center" size="large">
          <n-badge :value="countNotifications">
            <n-button text @click="showNotifications = true">
              <ion-icon name="notifications" size="18px"></ion-icon>
            </n-button>
          </n-badge>
          <language-switcher></language-switcher>
          <n-button text tag="span" @click="toggleTheme">
            <template #icon>
              <ion-icon v-if="theme === null" name="sunny"></ion-icon>
              <ion-icon v-if="theme !== null" name="moon"></ion-icon>
            </template>
            {{ $t(`theme.${themeLabel}`) }}
          </n-button>
          <n-text>{{ appVersion }}</n-text>
        </n-space>
      </n-layout-header>
      <n-layout :style="{ flex: '1 1 100%' }" has-sider>
        <navigation></navigation>
        <n-layout-content :native-scrollbar="false">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-drawer v-model:show="showNotifications" :width="300">
      <n-drawer-content :title="$t('index.notification')"></n-drawer-content>
    </n-drawer>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NAvatar,
  NText,
  NDivider,
  NSpace,
  NButton,
  NPopover,
  NMenu,
  NDrawer,
  NDrawerContent,
  NConfigProvider,
  NBadge
} from 'naive-ui'
import { useOsTheme, darkTheme } from 'naive-ui'
import Navigation from '@/components/Navigation.vue'
import { version } from '@root/package.json'
import IonIcon from './components/IonIcon.vue'
import logo_2x from '@/assets/images/logo@2x.jpg'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { zhCN, dateZhCN } from 'naive-ui'

export default defineComponent({
  name: 'Index',
  components: {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NAvatar,
    NText,
    NDivider,
    NSpace,
    NButton,
    NPopover,
    NMenu,
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NBadge,
    Navigation,
    IonIcon,
    LanguageSwitcher
  },
  setup() {
    const osThemeRef = useOsTheme()
    const themeLabel = ref(osThemeRef.value)
    const themeOverrides = {}
    const showNotifications = ref(false)
    const countNotifications = ref(0)
    const toggleTheme = () => {
      if (themeLabel.value === 'dark') {
        themeLabel.value = 'light'
      } else {
        themeLabel.value = 'dark'
      }
    }
    return {
      themeLabel,
      theme: computed(() => (themeLabel.value === 'dark' ? darkTheme : null)),
      themeOverrides,
      toggleTheme,
      showNotifications,
      countNotifications,
      appVersion: `v${version}`,
      logo_2x
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale === 'zh-CN' ? zhCN : null
    },
    dateLocale() {
      return this.$i18n.locale === 'zh-CN' ? dateZhCN : null
    }
  }
})
</script>

<style lang="less" scoped>
.main-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: 18px;
  width: 100%;

  .layout-header__right {
    font-size: 14px;
  }
}

.sider-content {
  padding: 6px 0;
}
</style>
