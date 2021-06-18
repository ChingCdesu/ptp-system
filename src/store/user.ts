import { ActionContext } from "vuex"
import { State } from "."

export interface IUserState_Role {}

export interface IUserState {
  user_id: number | null
  token: string | null
  role: IUserState_Role | null,
  auto_login: boolean
}

export const module = {
  state() {
    return {
      auto_login: false
    }
  },
  mutations: {
    setUserId(state: IUserState, id: number) {
      state.user_id = id
    },
    setUserToken(state: IUserState, token: string) {
      state.token = token
    },
    setUserRole(state: IUserState, role: IUserState_Role) {
      state.role = role
    },
    setAutoLogin(state: IUserState, auto_login: boolean) {
      state.auto_login = auto_login
    }
  },
  actions: {
    setUserId(context: ActionContext<IUserState, State>, id: number) {
      context.commit('setUserId', id)
    },
    setUserToken(context: ActionContext<IUserState, State>, token: string) {
      context.commit('setUserToken', token)
    },
    setUserRole(context: ActionContext<IUserState, State>, role: IUserState_Role) {
      context.commit('setUserRole', role)
    },
    setAutoLogin(context: ActionContext<IUserState, State>, auto_login: boolean) {
      context.commit('setAutoLogin', auto_login)
    },
  },
}
