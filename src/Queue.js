// import Error from '../../error'
import {QueueTask, Task} from './task'
import QueueData from './QueueData'
import {error} from './error'

const OVER_TIME = 10000

class Queue {
  constructor () {
    this.queue = []
  }
  push (task) {
    let _task
    if (typeof task === 'function') {
      _task = new Task(task)
    } else if (this._isTask(task)) {
      _task = task
    } else if (this._isQueue(task)) {
      _task = new QueueTask(task)
    } else {
      _task = new Task((req, res, resolve) => {
        resolve(task)
      })
    }
    this.queue.push(_task)
    return this
  }

  /**
   * 开始触发异步队列，可以传递参数，传递的参数在第一个task中可见
   * @param data
   * @param defaultResponse
   * @returns {Promise<any>}
   */
  start (req, defaultRes) {
    return new Promise((resolve, reject) => {
      const queueData = new QueueData(req, defaultRes)
      this.next(0, queueData, resolve, reject)
      setTimeout(() => {
        reject(error(101, {title: 'queue'}))
      }, OVER_TIME)
    })
  }
  next (index, queueData, resolve, reject) {
    const task = this.queue[index]
    if (this._isTask(task)) {
      task.start(queueData).then((res) => {
        this.next(index + 1, queueData.setRes(res), resolve, reject)
      }).catch(error => {
        reject(error)
      })
    } else if (this.queue.length === index) {
      resolve(queueData.getRes())
    }
  }
  _isTask (obj) {
    return obj instanceof Task
  }
  _isQueue (obj) {
    return obj instanceof Queue
  }
}
export default Queue
