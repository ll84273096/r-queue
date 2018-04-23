import assert from 'assert'
import ElseIf from '../src/task/common/ElseIf'
import QueueData from '../src/QueueData'

describe('测试ElseIf类的功能', () => {
  it(`ElseIf的构造函数参数为true时,queueData的isSkip方法返回false`, (done) => {
    const _elseIf = new ElseIf(true)
    const queueData = new QueueData()
    _elseIf.start(queueData).then(() => {
      assert.ok(!queueData.isSkip())
      done()
    })
  })
  it(`ElseIf的构造函数参数为false时,queueData的isSkip方法返回true`, (done) => {
    const _elseIf = new ElseIf(false)
    const queueData = new QueueData()
    _elseIf.start(queueData).then(() => {
      assert.ok(queueData.isSkip())
      done()
    })
  })
})
