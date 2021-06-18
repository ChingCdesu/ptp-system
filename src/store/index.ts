import { createStore } from "vuex"
import VuexPersistence from "vuex-persist"

import { module as userModule, IUserState } from "./user"
import { module as navigationModule, INavigationState } from "./navigation"
import { module as optionModule, IOptionState } from './option'

export interface State {
  user: IUserState
  navigations: INavigationState,
  option: IOptionState
}

const vuexLocal = new VuexPersistence<State>({
  storage: localStorage,
})

export default createStore<State>({
  modules: {
    user: userModule,
    navigations: navigationModule,
    option: optionModule
  },
  plugins: [vuexLocal.plugin],
})
