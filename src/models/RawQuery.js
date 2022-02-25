import { raw, QueryBuilder } from 'objection'

class RawQuery extends QueryBuilder {
  selectRaw(query, params) {
    if (params) {
      return this.select(raw(query, params))
    }
    return this.select(raw(query))
  }
}

export default RawQuery
