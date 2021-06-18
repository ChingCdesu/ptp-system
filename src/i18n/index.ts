import { createI18n } from "vue-i18n"
import enUSMessage from "./en-US"
import zhCNMessage from "./zh-CN"
import store from "@/store"

export interface I18nField {
  enUS: {
    [key: string]: any
  },
  zhCN: {
    [key: string]: any
  }
}

export const avaliableLocales = [
  {
    key: 'en-US',
    label: 'English',
  },
  {
    key: 'zh-CN',
    label: '中文',
  }
]

const i18n = createI18n({
  locale: store.state.option.locale || 'zh-CN',
  avaliableLocales: ['en-US', 'zh-CN'],
  messages: {
    "en-US": enUSMessage,
    "zh-CN": zhCNMessage
  }
})

export function addI18nField(field: I18nField | null) {
  if (field?.enUS)
    i18n.global.mergeLocaleMessage('en-US', field.enUS)
  if (field?.zhCN)
    i18n.global.mergeLocaleMessage('zh-CN', field.zhCN)
}

export default i18n