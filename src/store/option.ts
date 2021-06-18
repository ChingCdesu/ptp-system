import { ActionContext } from "vuex"
import { State } from "."

export interface IOptionState {
  locale: string
}

export const module = {
  state() {
    return {}
  },
  mutations: {
    setLocale(state: IOptionState, locale: string) {
      state.locale = locale
    }
  },
  getters: {},
  actions: {
    setLocale(context: ActionContext<IOptionState, State>, locale: string) {
      context.commit('setLocale', locale)
    }
  },
}