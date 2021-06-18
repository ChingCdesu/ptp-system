import MockAdapter from 'axios-mock-adapter'
import request from '../request'
import { AxiosRequestConfig } from 'axios'

const mock = new MockAdapter(request)

interface MockRequestConfig {
  url: string,
  method: string
}

type MockResponseFunction = (config: AxiosRequestConfig) => any

export interface IMockConfig {
  request: MockRequestConfig,
  response: MockResponseFunction
}

export default mock