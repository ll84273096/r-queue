import Task from '../src/task/base/Task'
import QueueData from '../src/QueueData'
import assert from 'assert'

describe('测试Task类的功能', () => {
  it(`通过Task实例的start方法传入req = '0'和defaultRes = '1', 返回 req + defaultRes = '01'`, (done) => {
    const task = new Task((req, res, next, error) => {
      next(req + res)
    })
    task.start(new QueueData('0', '1')).then((res) => {
      assert.equal(res, '01')
      done()
    })
  })
})
