import request from "./request"
import { IBaseModel, ISearchOption, IMetaDataModel } from "./interfaces"
import * as ResponseCode from "./rc"

class BaseApi<Model extends IBaseModel> {
  table: string
  prefix: string

  constructor(table: string) {
    this.table = table
    this.prefix = `/${this.table}`
  }

  async create(data: Model): Promise<Model> {
    const response = await request.post(this.prefix, data)
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async get(id: number): Promise<Model> {
    const response = await request.get(`${this.prefix}/${id}`)
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async update(data: Model): Promise<Model> {
    const response = await request.put(`${this.prefix}/${data.id}`, data)
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async delete(id: number): Promise<Model> {
    const response = await request.delete(`${this.prefix}/${id}`)
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async list<SearchOption extends ISearchOption>(
    options: SearchOption
  ): Promise<Model[]> {
    const response = await request.get(this.prefix, {
      params: options,
    })
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async add_meta(
    id: number,
    meta_key: string,
    meta_value: object | string | null
  ): Promise<IMetaDataModel> {
    const response = await request.post(
      `${this.prefix}/${id}/meta/${meta_key}`,
      meta_value
    )
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async get_meta(id: number, meta_key: string): Promise<IMetaDataModel> {
    const response = await request.get(`${this.prefix}/${id}/meta/${meta_key}`)
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async delete_meta(id: number, meta_key: string): Promise<IMetaDataModel> {
    const response = await request.delete(
      `${this.prefix}/${id}/meta/${meta_key}`
    )
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }

  async list_meta(id: number): Promise<IMetaDataModel[]> {
    const response = await request.get(`${this.prefix}/${id}/meta`)
    if (response.data.code !== ResponseCode.SUCCESS) {
      throw { message: response.data.message, prompt: response.data.prompt }
    }
    return response.data.obj
  }
}

export default BaseApi
