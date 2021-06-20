import BaseApi from "./base"
import { IBaseModel } from './interfaces'
import request from './request'
import { I18nField } from "@/i18n"

export interface IModuleModel extends IBaseModel {
  i18n: I18nField,
  name: string,
  path: string,
  component: string,
  children: IModuleModel[] | null,
  icon: string
}

class ModuleApi extends BaseApi<IModuleModel> {
  constructor() {
    super('modules')
  }

  async list() {
    return await request.get(`${this.prefix}`)
  }
}

export default ModuleApi
