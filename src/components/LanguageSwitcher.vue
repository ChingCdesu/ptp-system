<template>
  <n-popover
    placement="bottom"
    size="small"
    trigger="click"
    :style="{ padding: 0, textAlign: 'center' }"
  >
    <template #trigger>
      <n-button text tag="a">
        <template #icon>
          <ion-icon name="earth"></ion-icon>
        </template>
        Language
      </n-button>
    </template>
    <n-menu
      :options="languageOptions"
      v-model:value="currentLanguage"
      @update:value="toggleLanguage"
    ></n-menu>
  </n-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NPopover, NMenu } from 'naive-ui'
import { avaliableLocales } from '@/i18n'
import store from '@/store'
import router from '@/router'
import refreshWindowTitle from '@/utils/title'
import IonIcon from '@/components/IonIcon.vue'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: {
    NButton,
    NMenu,
    NPopover,
    IonIcon
  },
  emits: {
    changed: (locale: string | undefined) => {
      return locale
    }
  },
  data() {
    const currentLanguage = avaliableLocales.find(locale => locale.key === this.$i18n.locale)?.key
    return {
      currentLanguage
    }
  },
  computed: {
    languageOptions() {
      return avaliableLocales
    }
  },
  methods: {
    toggleLanguage(key: any) {
      store.dispatch('setLocale', key)
      this.$i18n.locale = key
      refreshWindowTitle(router.currentRoute.value.name)
      this.$emit('changed', this.currentLanguage)
    }
  }
})
</script>


