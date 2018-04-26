import {Queue} from '../src'
import assert from 'assert'
describe('测试Queue类', () => {
  it('传入0经过两个task的处理返回012', (done) => {
    const queue = new Queue()
    queue.push((req, res, next) => {
      next(res + '1')
    })
    queue.push((req, res, next) => {
      next(res + '2')
    })
    queue.start(null, '0').then((res) => {
      assert.equal(res, '012')
      done()
    })
  })
  it('queue中的task没有调用next方法抛出超时异常', (done) => {
    const queue = new Queue()
    queue.push((req, res, next) => {})
    queue.start().then((res) => {}).catch(error => {
      assert.ok(error instanceof Error)
      assert.ok(error.code === 1001)
      done()
    })
  })
})
