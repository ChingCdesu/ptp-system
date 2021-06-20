import BaseApi from "./base"
import { ISubjectModel } from './interfaces'

class SubjectApi extends BaseApi<ISubjectModel> {
  constructor() {
    super("subject")
  }
}

export default SubjectApi
