import { I18nField } from "@/i18n"
import { ActionContext } from "vuex"
import { State } from "."
import router from "@/router"

export interface INavigationItem {
  name: string,
  path: string,
  componentName: string,
  children: INavigationItem[] | null,
  title: I18nField | null,
  meta: object | null,
  icon: string | null
}

export type INavigationState = INavigationItem[]

export const module = {
  state() {
    return []
  },
  mutations: {
    mergeRouter(state: INavigationState, item: INavigationItem) {
      const index = state.findIndex(i => i.componentName === item.componentName)
      if (index === -1)
        state.push(item)
      else
        state[index] = item
    },
    clearRouter(state: INavigationState) {
      state.splice(0, state.length)
    }
  },
  getters: {},
  actions: {
    mergeRouter(context: ActionContext<INavigationState, State>, item: INavigationItem) {
      context.commit('mergeRouter', item)
    },
    clearRouter(context: ActionContext<INavigationState, State>) {
      context.commit('clearRouter')
    }
  },
}