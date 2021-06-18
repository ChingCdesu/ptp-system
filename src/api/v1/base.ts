import request from './request'

export interface ISearchOption {
  keyword: string
}

export interface IBaseModel {
  id: number | null
}

class BaseApi<Model extends IBaseModel> {
  table: string
  prefix: string
  
  constructor(table: string) {
    this.table = table
    this.prefix = `/${this.table}`
  }

  async create(data: Model) {
    return await request.post(this.prefix, data)
  }

  async get(id: number) {
    return await request.get(`${this.prefix}/${id}`)
  }

  async update(data: Model) {
    return await request.put(`${this.prefix}/${data.id}`, data)
  }

  async delete(id: number) {
    return await request.delete(`${this.prefix}/${id}`)
  }

  async list<SearchOption extends ISearchOption>(options: SearchOption) {
    return await request.get(this.prefix, {
      params: options
    })
  }

  async add_meta(id: number, meta_key: string, meta_value: object | string | null) {
    return await request.post(`${this.prefix}/${id}/meta/${meta_key}`, meta_value)
  }

  async get_meta(id: number, meta_key: string) {
    return await request.get(`${this.prefix}/${id}/meta/${meta_key}`)
  }

  async delete_meta(id: number, meta_key: string) {
    return await request.delete(`${this.prefix}/${id}/meta/${meta_key}`)
  }

  async list_meta(id: number) {
    return await request.get(`${this.prefix}/${id}/meta`)
  }
}

export default BaseApi