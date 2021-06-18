import BaseApi, { IBaseModel } from "./base"
import request from './request'
import store from "@/store"
import { I18nField } from "@/i18n"

export interface IModuleModel extends IBaseModel {
  i18n: I18nField,
  name: string,
  path: string,
  component: string,
  children: IModuleModel[] | null,
  icon: string,
  meta: any
}

class ModuleApi extends BaseApi<IModuleModel> {
  constructor() {
    super('module')
  }

  async list() {
    return await request.get(`${this.prefix}`)
  }
}

export default ModuleApi
