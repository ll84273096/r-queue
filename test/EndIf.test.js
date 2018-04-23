import assert from 'assert'
import If from '../src/task/common/If'
import EndIf from '../src/task/common/EndIf'
import QueueData from '../src/QueueData'

describe('测试EndIf类的功能', () => {
  it(`queueData中的isSkip的方法返回true的时候，经过EndIf类处理后，isSkip方法返回false`, (done) => {
    const _endIf = new EndIf()
    const queueData = new QueueData()
    queueData.setSkip(true)
    _endIf.start(queueData).then(() => {
      assert.ok(!queueData.isSkip())
      done()
    })
  })
  it(`queueData中的isSkip的方法返回false的时候，经过EndIf类处理后，isSkip方法返回false`, (done) => {
    const _endIf = new EndIf()
    const queueData = new QueueData()
    queueData.setSkip(false)
    _endIf.start(queueData).then(() => {
      assert.ok(!queueData.isSkip())
      done()
    })
  })
})
