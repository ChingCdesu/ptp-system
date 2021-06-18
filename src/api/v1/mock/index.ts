import mock, { IMockConfig } from "./mock"

import userMock from './user'
import roleMock from './role'
import moduleMock from './module'

const mocks: IMockConfig[] = [...userMock, ...roleMock, ...moduleMock]

for (const m of mocks) {
  if (m.request.method === 'GET') {
    mock.onGet(m.request.url).reply(m.response)
  } else if (m.request.method === 'POST') {
    mock.onPost(m.request.url).reply(m.response) 
  } else if (m.request.method === 'PUT') {
    mock.onPut(m.request.url).reply(m.response)
  } else if (m.request.method === 'DELETE') {
    mock.onDelete(m.request.url).reply(m.response)
  }
}