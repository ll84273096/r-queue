import merge from 'merge'
import _ from 'underscore'

class QueueData {
  constructor (req, res) {
    this._originalReq = _.isNull(req) == null ? undefined : merge.recursive(true, req)
    this._req = req == null ? undefined : req
    this._res = res == null ? undefined : res
    this._skip = 0
    this._data = {}
  }

  /**
   * 设置请求参数
   * @param req
   * @returns {QueueData}
   */
  setReq (req) {
    if (_.isObject(req)) {
      this._req = merge.recursive(true, req)
    } else {
      this._req = req
    }
    return this
  }

  /**
   * 获得请求参数
   * @returns {*}
   */
  getReq () {
    let returnValue = this._req
    if (_.isObject(this._req)) {
      returnValue = merge.recursive(true, this._req)
    }
    return returnValue
  }

  /**
   * 设置返回参数（当前task的返回值）
   * @param res
   * @returns {QueueData}
   */
  setRes (res) {
    this._res = res
    return this
  }

  /**
   * 获得返回参数（上一个task的返回值）
   * @returns {*}
   */
  getRes () {
    return this._res
  }

  /**
   * 获得原始的请求值
   * @returns {*}
   */
  getOriginalReq () {
    return this._originalReq
  }

  /**
   * 设置自定义数据
   * @param key
   * @param value
   */
  setData (key, value) {
    this._data[key] = value
  }

  /**
   * 获得自定义数据
   * @param key
   * @returns {*}
   */
  getData (key) {
    return this._data[key]
  }
  setSkip (key = true) {
    this._skip = key
  }
  isSkip () {
    return this._skip
  }
}

export default QueueData
